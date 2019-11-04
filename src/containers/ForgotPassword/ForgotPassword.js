import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import FormInput from "../../components/ui/FormInput/FormInput";
import Button from "../../components/ui/Button/Button";
import Spinner from "../../components/ui/Spinner/Spinner";
import Message from "../../components/ui/Message/Message";
import { validateInput } from "../../shared/utility";

import classes from "../Login/Login.module.css";

class ForgotPassword extends Component {
    state = {
        formIsValid: false,
        loading: false,
        hasError: false,
        message: null,
        loginForm: {
            email: {
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
        }
    };

    componentDidMount() {
        if (this.props.error) {
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

    submitForgotPasswordFormHandler = event => {
        event.preventDefault();
        this.setState({loading: true});
        
        axios.post(`${process.env.REACT_APP_API_URL}/users/forgot`, {email: this.state.loginForm.email.value})
            .then(response => {
                this.setState({loading: false, hasError: false, message: "Success! Click the link in your email to continue the password reset process. This tab will automatically redirect to the home page in 30 seconds."});
                setTimeout(() => this.props.history.push("/"), 30000);
            })
            .catch(error => {
                this.setState({loading: false, hasError: true, message: error.response.data});
            })

    };

    cancelForgotPasswordHandler = event => {
        event.preventDefault();
        this.props.history.go(-1);
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
                <Button buttonType="Login" disabled={!this.state.formIsValid} click={event => this.submitForgotPasswordFormHandler(event)}>Send Password Reset Email</Button>
                <div><Button buttonType="Cancel" click={event => this.cancelForgotPasswordHandler(event)}>Go Back</Button></div>
            </form>
        );

        if (this.state.loading) {
            formDisplay = <Spinner/>;
        }

        let message = null;

        if (this.state.message) {
            message = <p className={this.state.hasError ? classes.ErrorMessage : classes.SuccessMessage}>{this.state.message}</p>;
        }

        return (
            <div className={classes.LoginForm}>
                {message}
                {formDisplay}
            </div>
        );
    }
}

export default withRouter(ForgotPassword);