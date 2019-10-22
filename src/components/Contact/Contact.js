import React from "react";

import classes from "../OrderSuccess/OrderSuccess.module.css";

function contact(props) {
    return (
        <div className={classes.OrderSuccess}>
            <h1 className={classes.Header}>Our Contact Info</h1>
            <p className={classes.Text}>matt.ubercomputer@gmail.com</p>
            <p className={classes.Text}>555-555-5555</p>
            <p className={classes.Signature}>— Matt and Mick</p>
        </div>
    );
}

export default contact;