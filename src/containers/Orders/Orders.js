import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter} from "react-router-dom";

import ColumnHeaders from "./ColumnHeaders/ColumnHeaders";
import Order from "./Order/Order";
import Spinner from "../../components/ui/Spinner/Spinner";
import PartsSummary from "../../components/PartsSummary/PartsSummary";
import Modal from "../../components/ui/Modal/Modal";
import DeleteConfirmation from "../../components/ui/Modal/DeleteConfirmation/DeleteConfirmation";
import Message from "../../components/ui/Message/Message";
import Button from "../../components/ui/Button/Button";

import { formatDate } from "../../shared/utility";
import * as ordersActions from "../../store/actions/orders";
import classes from "./Orders.module.css";

class Orders extends Component {
    state = {
        loading: true,
        orders: [],
        error: false,
        selectedOrderId: null,
        message: null
    };

    componentDidMount() {
        axios.get(`https://ubercomputer-server.herokuapp.com/api/orders/${this.props.userData.id}`, {
            headers: {
                "Authorization": `Bearer ${this.props.token}`
            }})
            .then(response => {
                this.setState({orders: response.data, loading: false});
            })
            .catch(error => {
                this.setState({error: error, loading: false});
            });
    }

    orderSelectedHandler = orderId => {
        const selectedOrder = this.state.orders.find(order => order.id === orderId);

        if (orderId === this.state.selectedOrderId) {
            this.setState({selectedOrderId: null});
            
            if (selectedOrder.status !== "Completed") {
                this.props.onDisableCancelSelectedOrder();
            }
        }
        else {
            this.setState({selectedOrderId: orderId});
        
            if (selectedOrder.status !== "Completed") {
                if (!this.props.enableCancelSelectedOrder) {
                    this.props.onEnableCancelSelectedOrder();
                }
            }
            else {
                if (this.props.enableCancelSelectedOrder) {
                    this.props.onDisableCancelSelectedOrder();
                }
            }
        }
    };

    abortOrderCancellationHandler = () => {
        this.props.onSetCancellingStateFalse();
    };

    selectedOrderCancelledHandler = () => {
        this.setState({loading: true});
        this.props.onSetCancellingStateFalse();

        axios.delete(`https://ubercomputer-server.herokuapp.com/api/orders/${this.state.selectedOrderId}/${this.props.userData.id}`, {
            headers: {
                "Authorization": `Bearer ${this.props.token}`
            }})
            .then(response => {
                const updatedOrders = this.state.orders.filter(order => order.id !== this.state.selectedOrderId);
                this.setState({loading: false, orders: updatedOrders, selectedOrderId: null, error: false, message: "Success! Your order has been deleted."});
                this.props.onDisableCancelSelectedOrder();
            })
            .catch(error => {
                this.setState({loading: false, error: true, message: "Sorry. There was a problem deleting your order. Please try again in a minute. If the problem persists, feel free to contact us."});
            }); 
    }

    render() {
        let ordersDisplay = <Spinner/>;
        let selectedOrderDetailsDisplay = null;
        let modalContentDisplay = null;
        let messageDisplay = null;

        if (!this.state.loading) {
            ordersDisplay = [];
            
            if (this.state.orders.length === 0) {
                ordersDisplay = <Button buttonType="Login" click={() => this.props.history.push("/")}>You Don't Have Any Orders To Display. Click Here To Get Started!</Button>;
            }
            else {
                for (let order of this.state.orders) {
                    ordersDisplay.push(<Order key={order.id} orderNumber={order.id} orderDate={formatDate(new Date(order.dateTimeSubmitted))} selectedOrderId={this.state.selectedOrderId} 
                    status={order.status} readyForDeliveryBy={formatDate(new Date(order.deadlineForReadyForDelivery))} total={order.grandTotal} click={this.orderSelectedHandler}/>);
                }
            }

            if (this.state.selectedOrderId) {
                const selectedOrder = this.state.orders.find(order => order.id === this.state.selectedOrderId);
    
                let parts = {};
    
                for (let key in this.props.keys) {
                    parts = {
                        ...parts,
                        [key]: selectedOrder[key] === null ? null : {
                            ...selectedOrder[key],
                            price: Math.round(selectedOrder[key].price * 1.05)
                        }
                    };
                }

                if (selectedOrder.isCrossfireSLISystem) {
                    parts.videoCard.price = parts.videoCard.price * 2;
                }
    
                selectedOrderDetailsDisplay = <PartsSummary parts={parts}/>; 
                modalContentDisplay = (<DeleteConfirmation cancelDelete={this.abortOrderCancellationHandler} confirmDelete={this.selectedOrderCancelledHandler} 
                                        orderNumber={selectedOrder.id} status={selectedOrder.status}/>);
            }

            if (this.state.message) {
                messageDisplay = <Message hasError={this.state.error}>{this.state.message}</Message>
            }
        }

        return (
            <React.Fragment>
                <Modal show={this.props.showConfirmation} closeModal={this.abortOrderCancellationHandler}>
                    {modalContentDisplay}
                </Modal>
                <div className={classes.Orders}>
                    <h1 className={classes.PageHeader}>ORDER HISTORY</h1>
                    {messageDisplay}
                    <ColumnHeaders/>
                    <div>
                        {ordersDisplay}
                    </div>
                    <div className={classes.SelectedOrderDetails}>
                        {selectedOrderDetailsDisplay}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.user.token,
        userData: state.user.userData,
        keys: state.parts.headings,
        enableCancelSelectedOrder: state.orders.enableCancelSelectedOrder,
        showConfirmation: state.orders.cancelling
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onEnableCancelSelectedOrder: () => dispatch(ordersActions.enableCancelSelectedOrder()),
        onDisableCancelSelectedOrder: () => dispatch(ordersActions.disableCancelSelectedOrder()),
        onSetCancellingStateFalse: () => dispatch(ordersActions.setCancellingState(false))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Orders));