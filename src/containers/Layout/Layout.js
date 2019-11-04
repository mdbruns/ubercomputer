import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Footer from "../../components/Navigation/Footer/Footer";

import * as userActions from "../../store/actions/user";
import * as partActions from "../../store/actions/parts";
import * as ordersActions from "../../store/actions/orders";

import classes from "./Layout.module.css";

class Layout extends Component {
    state = {
        showSideDrawer: false,
        showSidebar: false
    };
    
    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false});
    };

    toggleSideDrawerHandler = () => {
        this.setState(prevState => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    };

    proceedToCheckoutHandler = () => {
        if (this.props.isAuthenticated) {
            this.props.history.push("/checkout");
        }
        else {
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.onSetAuthErrorMessage("Please Login Before Proceeding To Checkout");
            this.props.history.push("/login");
        }
        
        window.scrollTo(0, 0);
    };
    
    cancelCheckoutHandler = () => {
        this.props.history.push("/");
        window.scrollTo(0, 0);
    };

    cancelSelectedOrderHandler = () => {
        this.props.onCancelSelectedOrderButtonPressed();
    };

    submitOrderHandler = () => {
        this.props.onSetCheckoutLoadingTrue();

        let selections = {};

        for (let category in this.props.selectedParts) {
            selections = {...selections, [category]: this.props.selectedParts[category].name === "None" ? null : this.props.selectedParts[category]};
        }

        const dateTimeSubmitted = new Date();
        const deadlineForReadyForDelivery = new Date(dateTimeSubmitted);

        if (this.props.expressService) {
            deadlineForReadyForDelivery.setDate(deadlineForReadyForDelivery.getDate() + 7);
        }
        else {
            deadlineForReadyForDelivery.setDate(deadlineForReadyForDelivery.getDate() + 14);
        }

        axios.post(`${process.env.REACT_APP_API_URL}/orders`, {
            expressService: this.props.expressService,
            isCrossfireSLISystem: this.props.isCrossfireSLICompatibleSystem,
            subtotal: this.props.subtotal,
            buildingFee: this.props.buildFeePrice,
            serviceFee: this.props.expressService ? this.props.servicePrices.express : this.props.servicePrices.standard,
            grandTotal: this.props.expressService ? this.props.subtotal + this.props.servicePrices.express + this.props.buildFeePrice : this.props.subtotal + this.props.servicePrices.standard + this.props.buildFeePrice,
            dateTimeSubmitted: dateTimeSubmitted,
            deadlineForReadyForDelivery: deadlineForReadyForDelivery, 
            status: "Processing",
            ...selections,
            user: this.props.userData
        }, {
            headers: {
                "Authorization": `Bearer ${this.props.token}`
            }
        })
        .then(response => {
            this.props.onSetCheckoutLoadingFalse();
            this.props.onSubmitOrderSuccess();
            this.props.history.push("/success");
        })
        .catch(error => {
            this.props.onSetCheckoutLoadingFalse();
            console.log(error);
        });
    };

    render() {
        let contentAssignedClasses = [classes.Content];

        if (this.props.location.pathname === "/") {
            contentAssignedClasses.push(classes.AccountForSidebar);
        }

        return (
            <React.Fragment>
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler} isAuthenticated={this.props.isAuthenticated}></Toolbar>
                <SideDrawer showSideDrawer={this.state.showSideDrawer} closeSideDrawer={this.closeSideDrawerHandler} isAuthenticated={this.props.isAuthenticated}></SideDrawer>
                <main className={contentAssignedClasses.join(" ")}>{this.props.children}</main>
                <Footer goToCheckout={this.proceedToCheckoutHandler} cancelCheckout={this.cancelCheckoutHandler} submitOrder={this.submitOrderHandler} 
                    cancelSelectedOrder={this.cancelSelectedOrderHandler} currentPath={this.props.history.location.pathname}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.user.token,
        isAuthenticated: state.user.token !== null,
        subtotal: state.parts.subtotal,
        expressService: state.parts.expressService,
        servicePrices: state.parts.servicePrices,
        buildFeePrice: state.parts.buildFeePrice,
        selectedParts: state.parts.selections,
        userData: state.user.userData,
        isCrossfireSLICompatibleSystem: state.parts.isCrossfireSLICompatibleSystem
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: path => dispatch(userActions.setAuthRedirectPath(path)),
        onSetAuthErrorMessage: error => dispatch(userActions.setAuthErrorMessage(error)),
        onSubmitOrderSuccess: () => dispatch(partActions.resetPartsState()),
        onCancelSelectedOrderButtonPressed: () => dispatch(ordersActions.setCancellingState(true)),
        onSetCheckoutLoadingTrue: () => dispatch(ordersActions.setCheckoutLoadingState(true)),
        onSetCheckoutLoadingFalse: () => dispatch(ordersActions.setCheckoutLoadingState(false))  
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));