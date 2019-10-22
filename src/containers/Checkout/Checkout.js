import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import PartsSummary from "../../components/PartsSummary/PartsSummary";
import DeliverySummary from "../../components/DeliverySummary/DeliverySummary";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import ServiceOptions from "../../components/ServiceOptions/ServiceOptions";
import Spinner from "../../components/ui/Spinner/Spinner";

import classes from "./Checkout.module.css";

class Checkout extends Component {
    goToUpdateHandler = () => {
        this.props.history.push("/update");
    };

    render() {
        let checkoutDisplay = (
            <div className={classes.Checkout} onScroll={this.scrollHandler}>
                <PartsSummary/>
                <div className={classes.DeliveryAndOrderSummaries}>
                    <DeliverySummary click={this.goToUpdateHandler}/>
                    <ServiceOptions/>
                    <OrderSummary/>
                </div>
            </div>
        );
        
        if (this.props.loading) {
            checkoutDisplay = <Spinner/>
        }

        return checkoutDisplay;
    }
}

const mapStateToProps = state => {
    return {
        loading: state.orders.loading
    };
};

export default connect(mapStateToProps)(withRouter(Checkout));