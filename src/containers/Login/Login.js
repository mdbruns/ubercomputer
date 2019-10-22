import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";

import FormInput from "../../components/ui/FormInput/FormInput";
import Button from "../../components/ui/Button/Button";
import Spinner from "../../components/ui/Spinner/Spinner";
import * as userActions from "../../store/actions/user";
import { validateInput } from "../../shared/utility";

import classes from "./Login.module.css";

class Login extends Component {
    state = {
        formIsValid: false,
        loginForm: {
            email: {
                value: "",
                valid: false,
                touched: false  
            },
            password: {
                value: "",
                valid: false,
                touched: false  
            }
        }
    };

    loginFormConfig = {
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Email"
            },
            validation: {
                required: true,
                emailFormat: true,
                maxLength: 100
            }
        },
        password: {
            elementType: "input",
            elementConfig: {
                type: "password",
                placeholder: "Password"
            },
            validation: {
                required: true,
                minLength: 6,
                maxLength: 100
            }
        }
    };

    componentDidMount() {
        if (this.props.error && this.props.error !== "Please Login Before Proceeding To Checkout") {
            this.props.setErrorMessageOnPageLoad(null);
        }
    }

    inputChangedHandler = (event, inputKey) => {
        const updatedloginForm = {
            ...this.state.loginForm
        };

        const updatedFormInput = {
            ...this.state.loginForm[inputKey]
        };

        updatedFormInput.value = event.target.value;
        updatedFormInput.valid = validateInput(updatedFormInput.value, this.loginFormConfig[inputKey].validation);
        updatedFormInput.touched = true;
        updatedloginForm[inputKey] = updatedFormInput;
        
        let formIsValid = true;

        for (let inputKey in updatedloginForm) {
            formIsValid = updatedloginForm[inputKey].valid && formIsValid;
        }

        this.setState({loginForm: updatedloginForm, formIsValid: formIsValid});
    };

    submitloginFormHandler = event => {
        event.preventDefault();
        
        const authData = {
            email: this.state.loginForm.email.value,
            password: this.state.loginForm.password.value
        };

        this.props.onAuthenticate(authData, true, this.props.history, this.props.redirectPath);
    };

    goToRegisterPageHandler = event => {
        event.preventDefault();
        this.props.history.push("/register");
    };

    render() {
        const formElements = [];

        for (let inputKey in this.loginFormConfig) {
            let shouldValidate = false;

            if (this.loginFormConfig[inputKey].validation) {
                shouldValidate = true;
            }

            formElements.push({
                inputKey: inputKey, 
                elementType: this.loginFormConfig[inputKey].elementType, 
                elementConfig: this.loginFormConfig[inputKey].elementConfig, 
                inputData: this.state.loginForm[inputKey],
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
                <Button buttonType="Login" disabled={!this.state.formIsValid} click={event => this.submitloginFormHandler(event)}>Login</Button>
                <div><Button buttonType="Register" click={event => this.goToRegisterPageHandler(event)}>Don't Have An Account? Click Here</Button></div>
                <div className={classes.ForgotPasswordLink}><NavLink to="/forgot">I've Forgotten My Password</NavLink></div>
            </form>
        );

        if (this.props.loading) {
            formDisplay = <Spinner/>;
        }

        let message = null;

        if (this.props.location.pathname === "/login/reset-success") {
            message = <p className={classes.SuccessMessage}>Success! Password Reset</p>;
        }
        else if (this.props.error) {
            message = <p className={classes.ErrorMessage}>{this.props.error}</p>;
        }

        return (
            <div className={classes.LoginForm}>
                {message}
                {formDisplay}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.user.loading,
        error: state.user.error,
        redirectPath: state.user.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (authData, isLoggingIn, history, redirectPath) => dispatch(userActions.asyncAuthenticate(authData, isLoggingIn, history, redirectPath)),
        setErrorMessageOnPageLoad: error => dispatch(userActions.setAuthErrorMessage(error))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));