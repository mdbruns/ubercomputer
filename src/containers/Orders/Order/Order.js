import React from "react";

import classes from "./Order.module.css";

function order(props) {
    const assignedClasses = [classes.Order];

    if (props.selectedOrderId === props.orderNumber) {
        assignedClasses.push(classes.Selected);
    }

    return (
        <div className={assignedClasses.join(" ")} onClick={() => props.click(props.orderNumber)}>
            <span className={classes.OrderNumber}>#{props.orderNumber}</span>
            <span className={classes.OrderDate}>{props.orderDate}</span>
            <span className={classes.ReadyForDeliveryBy}>{props.readyForDeliveryBy}</span>
            <span className={classes.Status}>{props.status}</span>
            <span className={classes.Total}>${props.total}</span>
        </div>
    );
}

export default order;