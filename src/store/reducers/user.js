import * as actionTypes from "../actions/actionTypes";

const initialState = {
    token: null,
    userData: null,
    loading: false,
    error: null,
    authRedirectPath: "/"
};

function reducer(currentState = initialState, action) {
    const updatedState = {...currentState};

    switch (action.type) {
        case actionTypes.AUTHENTICATE_LOADING:
            updatedState.error = null;
            updatedState.loading = true;
            break;
        case actionTypes.AUTHENTICATE_SUCCESS:
            updatedState.token = action.token;
            updatedState.userData = action.userData;
            updatedState.error = null;
            updatedState.loading = false;
            break;
        case actionTypes.AUTHENTICATE_ERROR:
            updatedState.error = action.error;
            updatedState.loading = false;
            break;
        case actionTypes.LOGOUT:
            updatedState.token = null;
            updatedState.userData = null;
            break;
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            updatedState.authRedirectPath = action.path;
            break;
        case actionTypes.SET_AUTH_ERROR_MESSAGE:
            updatedState.error = action.error;
            break;
        case actionTypes.UPDATE_USER_DETAILS_SUCCESS:
            updatedState.userData = action.updatedUserData;
            updatedState.error = null;
            updatedState.loading = false;
            break;
        case actionTypes.UPDATE_USER_DETAILS_ERROR:
            updatedState.error = action.error;
            updatedState.loading = false;
            break;
        case actionTypes.UPDATE_TOKEN_AFTER_PASSWORD_CHANGE:
            updatedState.token = action.token;
            break;
        default:
            break;
    }

    return updatedState;
}

export default reducer;