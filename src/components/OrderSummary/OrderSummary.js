import React from "react";
import { connect } from "react-redux";

import classes from "./OrderSummary.module.css";

function orderSummary(props) {
    let deliveryFee = 0;

    if (props.expressService === true) {
        deliveryFee = props.servicePrices.express;
    }
    else if (props.expressService === false) {
        deliveryFee = props.servicePrices.standard;
    }

    return (
        <div className={classes.OrderSummary}>
            <h2 className={classes.Heading}>ORDER SUMMARY</h2>
            <p className={classes.SummaryRow}><span>Subtotal</span><span>${props.subtotal}</span></p>
            <p className={classes.SummaryRow}><span>Building Fee</span><span>${props.buildFeePrice}</span></p>
            <p className={classes.SummaryRow}><span>Delivery Fee</span><span>${deliveryFee}</span></p>
            <p className={classes.SummaryRow}><span>GRAND TOTAL</span><span>${props.expressService ? props.subtotal + props.servicePrices.express + props.buildFeePrice : props.subtotal + props.servicePrices.standard + props.buildFeePrice}</span></p>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        subtotal: state.parts.subtotal,
        expressService: state.parts.expressService,
        servicePrices: state.parts.servicePrices,
        buildFeePrice: state.parts.buildFeePrice
    };
};

export default connect(mapStateToProps)(orderSummary);