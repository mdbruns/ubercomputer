import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FormInput from "../../components/ui/FormInput/FormInput";
import Button from "../../components/ui/Button/Button";
import Spinner from "../../components/ui/Spinner/Spinner";
import * as userActions from "../../store/actions/user";
import { validateInput } from "../../shared/utility";

import classes from "./Register.module.css";

class Register extends Component {
    state = {
        formIsValid: this.props.history.location.pathname === "/update" ? true : false,
        registerForm: {
            email: {
                value: this.props.history.location.pathname === "/update" ? this.props.userData.email :  "",
                valid: this.props.history.location.pathname === "/update" ? true : false,
                touched: this.props.history.location.pathname === "/update" ? true : false  
            },
            password: {
                value: "",
                valid: this.props.history.location.pathname === "/update" ? true : false,
                touched: false,  
            },
            confirmPassword: {
                value: "",
                valid: this.props.history.location.pathname === "/update" ? true : false,
                touched: false,  
            },
            firstName: {
                value: this.props.history.location.pathname === "/update" ? this.props.userData.firstName :  "",
                valid: this.props.history.location.pathname === "/update" ? true : false,
                touched: this.props.history.location.pathname === "/update" ? true : false
            },
            lastName: {
                value: this.props.history.location.pathname === "/update" ? this.props.userData.lastName :  "",
                valid: this.props.history.location.pathname === "/update" ? true : false,
                touched: this.props.history.location.pathname === "/update" ? true : false
            },
            streetAddress: {
                value: this.props.history.location.pathname === "/update" ? this.props.userData.streetAddress :  "",
                valid: this.props.history.location.pathname === "/update" ? true : false,
                touched: this.props.history.location.pathname === "/update" ? true : false
            },
            city: {
                value: this.props.history.location.pathname === "/update" ? this.props.userData.city :  "",
                valid: this.props.history.location.pathname === "/update" ? true : false,
                touched: this.props.history.location.pathname === "/update" ? true : false
            },
            zipCode: {
                value: this.props.history.location.pathname === "/update" ? this.props.userData.zipCode :  "",
                valid: this.props.history.location.pathname === "/update" ? true : false,
                touched: this.props.history.location.pathname === "/update" ? true : false
            },
            phoneNumber: {
                value: this.props.history.location.pathname === "/update" ? this.props.userData.phoneNumber :  "",
                valid: this.props.history.location.pathname === "/update" ? true : false,
                touched: this.props.history.location.pathname === "/update" ? true : false
            }
        }
    };

    registerFormConfig = {
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
        },
        firstName: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "First Name"
            },
            validation: {
                required: true,
                maxLength: 100
            }
        },
        lastName: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Last Name"
            },
            validation: {
                required: true,
                maxLength: 100
            }
        },
        streetAddress: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Street Address"
            },
            validation: {
                required: true,
                maxLength: 200
            }
        },
        city: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "City"
            },
            validation: {
                required: true,
                maxLength: 100
            }
        },
        zipCode: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "ZIP Code"
            },
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
                onlyNumbers: true
            }
        },
        phoneNumber: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Phone Number (format: xxxxxxxxxx)"
            },
            validation: {
                required: true,
                minLength: 10,
                maxLength: 10,
                onlyNumbers: true
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
            let updatedUserData = {
                email: this.state.registerForm.email.value,
                firstName: this.state.registerForm.firstName.value,
                lastName: this.state.registerForm.lastName.value,
                streetAddress: this.state.registerForm.streetAddress.value,
                city: this.state.registerForm.city.value,
                zipCode: this.state.registerForm.zipCode.value,
                phoneNumber: this.state.registerForm.phoneNumber.value
            };
    
            if (this.props.history.location.pathname === "/register") {
                const authData = {
                    ...updatedUserData,
                    password: this.state.registerForm.password.value
                };
    
                this.props.onAuthenticate(authData, false, this.props.history, this.props.redirectPath);
            }
            else {
                updatedUserData = {
                    ...updatedUserData,
                    oldEmail: this.props.userData.email
                };

                this.props.onUpdateUserDetails(this.props.userData.id, updatedUserData, this.props.token, this.props.history);
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

        if (this.props.history.location.pathname === "/update") {
            formElements = formElements.filter(element => (element.inputKey !== "password") && (element.inputKey !== "confirmPassword"));
        }

        let formDisplay = (
            <form>
                {formElements.map(nextFormElement => (
                    <FormInput key={nextFormElement.inputKey} value={nextFormElement.inputData.value} changed={event => this.inputChangedHandler(event, nextFormElement.inputKey)}
                        invalid={!nextFormElement.inputData.valid} shouldValidate={nextFormElement.shouldValidate} touched={nextFormElement.inputData.touched}
                        elementType={nextFormElement.elementType} elementConfig={nextFormElement.elementConfig}/>
                ))}
                <Button buttonType="Register" disabled={!this.state.formIsValid} click={event => this.submitregisterFormHandler(event)}>{this.props.history.location.pathname === "/update" ? "Update" : "Register"} Your Details</Button>
                {this.props.history.location.pathname === "/update" ? <Button buttonType="Cancel" click={event => this.cancelUpdateAccountDetailsHandler(event)}>Cancel</Button> : null}
            </form>
        );

        if (this.props.loading) {
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
        onUpdateUserDetails: (userId, updatedUserData, token, history) => dispatch(userActions.asyncUpdateAccountDetails(userId, updatedUserData, token, history))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));