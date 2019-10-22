import React from "react";
import { connect } from "react-redux";

import Button from "../../ui/Button/Button";

import classes from "./Footer.module.css";

function footer(props) {
    let footerContent = null;

    switch (props.currentPath) {
        case "/":
            footerContent = (
                <React.Fragment>
                    <p className={classes.Subtotal}>Subtotal:<span className={classes.PriceAmount}>${props.subtotal}</span></p>
                    <Button buttonType="Footer" click={props.goToCheckout} disabled={props.disableProceedToCheckout}>Proceed To Checkout</Button>
                </React.Fragment>
            );
            break;
        case "/checkout":
            footerContent = (
                <React.Fragment>
                    <Button buttonType="Footer" click={props.cancelCheckout}>Go Back</Button>
                    <Button buttonType="Footer" disabled={props.disableSubmitOrder} click={props.submitOrder}>Submit Order</Button>
                </React.Fragment>
            );
            break;
        case "/orders":
            footerContent = (
                <React.Fragment>
                    <Button buttonType="Footer" click={props.cancelSelectedOrder} disabled={props.disableCancelSelectedOrder}>Cancel Order</Button>
                </React.Fragment>
            );
            break;
        default:
            break;
    }

    return (
        <footer className={footerContent ? classes.Footer : classes.Hide}>
            {footerContent}
        </footer>
    );
}

const mapStateToProps = state => {
    return {
        subtotal: state.parts.subtotal,
        disableProceedToCheckout: !state.parts.enableProceedToCheckout,
        disableCancelSelectedOrder: !state.orders.enableCancelSelectedOrder,
        disableSubmitOrder: state.parts.expressService === null
    };
};

export default connect(mapStateToProps)(footer);