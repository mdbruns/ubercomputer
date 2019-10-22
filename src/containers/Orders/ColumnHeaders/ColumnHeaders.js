import React from "react";

import classes from "./ColumnHeaders.module.css";

function columnHeaders(props) {
    return (
        <div className={classes.ColumnHeaders}>
            <span className={classes.OrderNumber}>ORDER NUMBER</span>
            <span className={classes.OrderDate}>ORDER DATE</span>
            <span className={classes.ReadyForDeliveryBy}>DELIVERY BY</span>
            <span className={classes.Status}>STATUS</span>
            <span className={classes.Total}>TOTAL</span>
        </div>
    );
}

export default columnHeaders;