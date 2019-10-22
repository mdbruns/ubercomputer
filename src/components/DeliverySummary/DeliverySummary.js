import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import classes from "./DeliverySummary.module.css";

function deliverySummary(props) {
    return (
        <React.Fragment>
            <div className={classes.SummaryBlock}>
                <h2 className={classes.Heading}><span>DELIVERY & CONTACT INFO</span><FontAwesomeIcon className={classes.EditIcon} icon={faEdit} onClick={props.click}/></h2>
                <p>{props.userData.firstName + " " + props.userData.lastName}</p>
                <p>{props.userData.streetAddress}</p>
                <p>{props.userData.city + ", OR " + props.userData.zipCode}</p>
                <p>{props.userData.email}</p>
                <p>{props.userData.phoneNumber}</p>
            </div>
            <div className={classes.SummaryBlock}>
                <h2 className={classes.Heading}>PAYMENT METHOD</h2>
                <p>Payment will be made with cash at the time of delivery.</p>
            </div>
            <div className={classes.SummaryBlock}>
                <h2 className={classes.Heading}>WARRANTY & TECH SUPPORT</h2>
                <p>The price of your PC includes a 1 year parts warranty and 1 year of technical support.</p>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        userData: state.user.userData
    };
};

export default connect(mapStateToProps)(deliverySummary);