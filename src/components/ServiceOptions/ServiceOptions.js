import React from "react";
import { connect } from "react-redux";
import * as partActions from "../../store/actions/parts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import classes from "./ServiceOptions.module.css";

function serviceOptions(props) {
    const standardServiceAssignedClasses = [classes.ServiceOption];
    const expressServiceAssignedClasses = [classes.ServiceOption];

    if (props.expressService === true) {
        expressServiceAssignedClasses.push(classes.Selected);
    }
    else if (props.expressService === false) {
        standardServiceAssignedClasses.push(classes.Selected);
    }

    return (
        <div>
            <h2 className={classes.Heading}>SERVICE OPTIONS</h2>
            <div className={standardServiceAssignedClasses.join(" ")} onClick={() => props.onSetExpressService(false)}>
                <div>
                    <p className={classes.ServiceName}><FontAwesomeIcon icon={props.expressService ? faCircle : faCheckCircle} className={classes.Icon}/>Standard Service</p>
                    <p className={classes.ServiceDescription}>Ready For Delivery Within 14 Days Of Ordering</p>
                </div>
                <p className={classes.Price}>${props.servicePrices.standard}</p>
            </div>
            <div className={expressServiceAssignedClasses.join(" ")} onClick={() => props.onSetExpressService(true)}>
                <div>
                    <p className={classes.ServiceName}><FontAwesomeIcon icon={props.expressService ? faCheckCircle : faCircle} className={classes.Icon}/>Express Service</p>
                    <p className={classes.ServiceDescription}>Ready For Delivery Within 7 Days Of Ordering</p>
                </div>
                <p className={classes.Price}>${props.servicePrices.express}</p>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        expressService: state.parts.expressService,
        servicePrices: state.parts.servicePrices
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetExpressService: boolean => dispatch(partActions.setExpressService(boolean)) 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(serviceOptions);