import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavLinks.module.css";

function navLinks(props) {
    let assignedClasses = [classes.NavLinks];

    let loginLink = <li><NavLink to="/login" activeClassName={classes.active} onClick={props.click}>Login</NavLink></li>;
    let registerLink = <li><NavLink to="/register" activeClassName={classes.active} onClick={props.click}>Register Account</NavLink></li>;
    let ordersLink = null;
    let logoutLink = null;
    let updateDetailsLink = null;
    let changePasswordLink = null;

    if (props.isAuthenticated) {
        assignedClasses.push(classes.LoggedIn);
        loginLink = null;
        registerLink = null;
        ordersLink = <li><NavLink to="/orders" activeClassName={classes.active} onClick={props.click}>View Orders</NavLink></li>;
        logoutLink = <li><NavLink to="/logout" activeClassName={classes.active} onClick={props.click}>Logout</NavLink></li>;
        updateDetailsLink = <li><NavLink to="/update" activeClassName={classes.active} onClick={props.click}>Update Contact Data</NavLink></li>;
        changePasswordLink = <li><NavLink to="/password" activeClassName={classes.active} onClick={props.click}>Change Password</NavLink></li>;
    }
    else {
        assignedClasses.push(classes.NotLoggedIn);
    }

    return (
        <ul className={assignedClasses.join(" ")}>
            <li><NavLink to="/" exact activeClassName={classes.active} onClick={props.click}>Build Your PC</NavLink></li>
            {loginLink}
            {registerLink}
            {ordersLink}
            {updateDetailsLink}
            {changePasswordLink}
            <li><NavLink to="/contact" activeClassName={classes.active} onClick={props.click}>Contact Us</NavLink></li>
            {logoutLink}
        </ul>
    );
}

export default navLinks;