import React from "react";
import classes from "./Button.module.css";

function button(props) {
    let assignedClasses = [classes.Button];

    if (props.buttonType === "Footer") {
        assignedClasses.push(classes.FooterButton);
    }
    else if (props.buttonType === "Login") {
        assignedClasses.push(classes.LoginButton);
    }
    else if (props.buttonType === "Register") {
        assignedClasses.push(classes.RegisterButton);
    }
    else if (props.buttonType === "BuildSetting") {
        assignedClasses.push(classes.BuildSettingButton);

        if (props.isSelected) {
            assignedClasses.push(classes.Selected);
        }
    }
    else {
        assignedClasses.push(classes.CancelButton);
    }

    return <button className={assignedClasses.join(" ")} disabled={props.disabled} onClick={props.isSelected ? null : props.click}>{props.children}</button>;
}

export default button;