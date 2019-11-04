import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FormInput from "../../components/ui/FormInput/FormInput";
import Button from "../../components/ui/Button/Button";
import Spinner from "../../components/ui/Spinner/Spinner";
import * as userActions from "../../store/actions/user";
import { validateInput } from "../../shared/utility";

import classes from "../Register/Register.module.css";

class Register extends Component {
    state = {
        formIsValid: false,
        loading: false,
        registerForm: {
            password: {
                value: "",
                valid: false,
                touched: false,  
            },
            confirmPassword: {
                value: "",
                valid: false,
                touched: false,  
            }
        }
    };

    registerFormConfig = {
        password: {
            elementType: "input",
            elementConfig: {
                type: "password",
                placeholder: "Password (min. 6 characters)"
            },
            validation: {
                required: true,
                minLength: 6,
                maxLength: 100
            }
        },
        confirmPassword: {
            elementType: "input",
            elementConfig: {
                type: "password",
                placeholder: "Confirm Password"
            },
            validation: {
                required: true,
                minLength: 6,
                maxLength: 100
            }
        }
    };

    componentDidMount() {
        if (this.props.error) {
            this.props.onSetErrorMessage(null);
        }
    }

    inputChangedHandler = (event, inputKey) => {
        const updatedregisterForm = {
            ...this.state.registerForm
        };

        const updatedFormInput = {
            ...this.state.registerForm[inputKey]
        };

        updatedFormInput.value = event.target.value;
        updatedFormInput.valid = validateInput(updatedFormInput.value, this.registerFormConfig[inputKey].validation);
        updatedFormInput.touched = true;
        updatedregisterForm[inputKey] = updatedFormInput;
        
        let formIsValid = true;

        for (let inputKey in updatedregisterForm) {
            formIsValid = updatedregisterForm[inputKey].valid && formIsValid;
        }

        this.setState({registerForm: updatedregisterForm, formIsValid: formIsValid});
    };

    submitregisterFormHandler = event => {
        event.preventDefault();

        if (this.state.registerForm.password.value !== this.state.registerForm.confirmPassword.value) {
            this.props.onSetErrorMessage("Passwords Do Not Match");
        }
        else {
            this.setState({loading: true});

            if (this.props.location.pathname === "/password") {
                const updatedUserData = {
                    email: this.props.userData.email,
                    password: this.state.registerForm.password.value,
                    firstName: this.props.userData.firstName,
                    lastName: this.props.userData.lastName,
                    streetAddress: this.props.userData.streetAddress,
                    city: this.props.userData.city,
                    zipCode: this.props.userData.zipCode,
                    phoneNumber: this.props.userData.phoneNumber
                };
    
                axios.put(`${process.env.REACT_APP_API_URL}/users/password/${this.props.userData.id}`, updatedUserData, {
                    headers: {
                        "Authorization": `Bearer ${this.props.token}`
                    }})
                    .then(response => {
                        this.props.onPasswordChangeSuccess(response.data);
                        this.props.history.go(-1);
                    })
                    .catch(error => {
                        this.setState({loading: false});
                        this.props.onSetErrorMessage(error.message);
                    });        
            }
            else {
                const { match: { params } } = this.props;

                const updatedUserData = {
                    id: params.userId,
                    password: this.state.registerForm.password.value
                };
                
                axios.put(`${process.env.REACT_APP_API_URL}/users/reset/${params.tokenId}/${params.token}`, updatedUserData)
                    .then(response => {
                        this.props.history.push("/login/reset-success");
                    })
                    .catch(error => {
                        this.setState({loading: false});
                        this.props.onSetErrorMessage(error.response.data);
                    });
            }
        }
    };

    cancelUpdateAccountDetailsHandler = event => {
        event.preventDefault();
        this.props.history.go(-1);
    };

    render() {
        let formElements = [];

        for (let inputKey in this.registerFormConfig) {
            let shouldValidate = false;

            if (this.registerFormConfig[inputKey].validation) {
                shouldValidate = true;
            }

            formElements.push({
                inputKey: inputKey, 
                elementType: this.registerFormConfig[inputKey].elementType, 
                elementConfig: this.registerFormConfig[inputKey].elementConfig, 
                inputData: this.state.registerForm[inputKey],
                shouldValidate: shouldValidate
            });
        }

        let formDisplay = (
            <form>
                {formElements.map(nextFormElement => (
                    <FormInput key={nextFormElement.inputKey} value={nextFormElement.inputData.value} changed={event => this.inputChangedHandler(event, nextFormElement.inputKey)}
                        invalid={!nextFormElement.inputData.valid} shouldValidate={nextFormElement.shouldValidate} touched={nextFormElement.inputData.touched}
                        elementType={nextFormElement.elementType} elementConfig={nextFormElement.elementConfig}/>
                ))}
                <Button buttonType="Register" disabled={!this.state.formIsValid} click={event => this.submitregisterFormHandler(event)}>Change Password</Button>
                {this.props.history.location.pathname === "/register" ? null : <Button buttonType="Cancel" click={event => this.cancelUpdateAccountDetailsHandler(event)}>Cancel</Button>}
            </form>
        );

        if (this.state.loading) {
            formDisplay = <Spinner/>;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = <p className={classes.ErrorMessage}>{this.props.error}</p>;
        }

        return (
            <div className={classes.RegisterForm}>
                {errorMessage}
                {formDisplay}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.user.loading,
        error: state.user.error,
        redirectPath: state.user.authRedirectPath,
        userData: state.user.userData,
        token: state.user.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (authData, isLoggingIn, history, redirectPath) => dispatch(userActions.asyncAuthenticate(authData, isLoggingIn, history, redirectPath)),
        onSetErrorMessage: error => dispatch(userActions.setAuthErrorMessage(error)),
        onUpdateUserDetails: (userId, updatedUserData, token, history) => dispatch(userActions.asyncUpdateAccountDetails(userId, updatedUserData, token, history)),
        onPasswordChangeSuccess: token => dispatch(userActions.updateTokenAfterPasswordChange(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));