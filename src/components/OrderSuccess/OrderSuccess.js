import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./OrderSuccess.module.css";

function orderSuccess(props) {
    return (
        <div className={classes.OrderSuccess}>
            <h1 className={classes.Header}>Order Successful</h1>
            <p className={classes.Text}>
                We'll get to work putting together your custom PC right away. In the meantime, you can monitor the status of your order
                and review details <NavLink className={classes.Link} to="/orders">here</NavLink>. Once your PC is built and ready to use, we'll contact you via email to arrange a suitable time for us to personally deliver it.
                Payment can be made with cash upon delivery. Thanks for your business. Feel free to <NavLink className={classes.Link} to="/contact">contact us</NavLink> if needed.
            </p>
            <p className={classes.Signature}>— Matt and Mick</p>
        </div>
    );
}

export default orderSuccess;