import React from "react";

import Button from "../../Button/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import classes from "./DeleteConfirmation.module.css";

function deleteConfirmation(props) {
    return (
        <div className={classes.DeleteConfirmation}>
            <FontAwesomeIcon className={classes.Icon} icon={faExclamationTriangle}/>
            <h3>Are you sure you wish to permanently delete order #{props.orderNumber} (status: {props.status})?</h3>
            <div>
                <Button buttonType="Login" click={props.confirmDelete}>Cancel Order</Button>
            </div>
            <div>
                <Button buttonType="Cancel" click={props.cancelDelete}>Go Back</Button>
            </div>
        </div>
    );
}

export default deleteConfirmation;