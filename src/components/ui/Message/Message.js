import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import classes from "./Message.module.css";

function message(props) {
    const assignedClasses = [classes.Message];

    if (props.hasError) {
        assignedClasses.push(classes.Failure)
    }
    else {
        assignedClasses.push(classes.Success);
    }

    return (
        <div className={assignedClasses.join(" ")}>
            <p><FontAwesomeIcon className={classes.Icon} icon={props.hasError ? faExclamation : faThumbsUp}/>{props.children}</p>
        </div>
    );
}

export default message;