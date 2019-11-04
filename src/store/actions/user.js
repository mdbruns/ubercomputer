import * as actionTypes from "./actionTypes";
import axios from "axios";

function authenticateLoading() {
    return {
        type: actionTypes.AUTHENTICATE_LOADING
    };
}

function authenticateSuccess(token, userData) {
    return {
        type: actionTypes.AUTHENTICATE_SUCCESS,
        token: token,
        userData: userData
    };
}

function authenticateError(error) {
    return {
        type: actionTypes.AUTHENTICATE_ERROR,
        error: error
    };
}

export function asyncAuthenticate(authData, isLoggingIn, history, redirectPath) {
    return function(dispatch) {
        dispatch(authenticateLoading());

        let url = `${process.env.REACT_APP_API_URL}/users/signup`;
        
        if (isLoggingIn) {
            url = `${process.env.REACT_APP_API_URL}/users/login`;
        }

        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + 3600000);
                
                localStorage.setItem("tokenExpirationDate", expirationDate);
                localStorage.setItem("token", response.data[0]);
                localStorage.setItem("userData", JSON.stringify(response.data[1]));
                
                dispatch(authenticateSuccess(response.data[0], response.data[1]));
                dispatch(asyncLogoutAfterAuthExpires(3600000));

                if (redirectPath === "/checkout") {
                    history.push("/checkout");
                    dispatch(setAuthRedirectPath("/"));
                }
                else {
                    history.push("/");
                }
            })
            .catch(error => {
                dispatch(authenticateError(error.response ? error.response.data : "Something unexpected went wrong on our end. Please try again later or contact us to report the problem."));
            });
    };
};

export function setAuthErrorMessage(error) {
    return {
        type: actionTypes.SET_AUTH_ERROR_MESSAGE,
        error: error
    };
};

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpirationDate");
    localStorage.removeItem("userData");

    return {
        type: actionTypes.LOGOUT
    };
};

function asyncLogoutAfterAuthExpires(expirationTimeInMilliseconds) {
    return function(dispatch) {
        setTimeout(() => dispatch(logout()), expirationTimeInMilliseconds);
    };
}

export function setAuthRedirectPath(path) {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export function authenticateFromLocalStorage() {
    return function(dispatch) {
        const token = localStorage.getItem("token");
        
        if (!token) {
            return;
        }
        else {
            const expirationDate = new Date(localStorage.getItem("tokenExpirationDate"));

            if (expirationDate <= new Date()) {
                return;
            }
            else {
                const userData = JSON.parse(localStorage.getItem("userData"));
                dispatch(authenticateSuccess(token, userData));
                dispatch(asyncLogoutAfterAuthExpires((expirationDate.getTime() - new Date().getTime())));
            }
        }
    }
}

function updateUserDetailsSuccess(updatedUserData) {
    localStorage.setItem("userData",JSON.stringify(updatedUserData));

    return {
        type: actionTypes.UPDATE_USER_DETAILS_SUCCESS,
        updatedUserData: updatedUserData
    };
}

function updateUserDetailsError(error) {
    return {
        type: actionTypes.UPDATE_USER_DETAILS_ERROR,
        error: error
    };
}

export function asyncUpdateAccountDetails(userId, updatedUserData, token, history) {
    return function(dispatch) {
        dispatch(authenticateLoading());

        axios.put(`${process.env.REACT_APP_API_URL}/users/contact/${userId}`, updatedUserData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }})
            .then(response => {
                dispatch(updateUserDetailsSuccess(response.data));
                history.go(-1);
            })
            .catch(error => {
                dispatch(updateUserDetailsError(error.message));
            });
    }
}

export function updateTokenAfterPasswordChange(token) {
    return {
        type: actionTypes.UPDATE_TOKEN_AFTER_PASSWORD_CHANGE,
        token: token
    };
};