import React from "react";
import classes from "./Backdrop.module.css";

function backdrop(props) {
    let backdropDisplay = null;
    if (props.show) {
        backdropDisplay = <div className={classes.Backdrop} onClick={props.click}></div>;
    }
    return backdropDisplay;
}

export default backdrop;