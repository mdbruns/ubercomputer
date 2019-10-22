import * as actionTypes from "./actionTypes";

export function enableCancelSelectedOrder() {
    return {
        type: actionTypes.ENABLE_CANCEL_SELECTED_ORDER
    };
};

export function disableCancelSelectedOrder() {
    return {
        type: actionTypes.DISABLE_CANCEL_SELECTED_ORDER
    };
};

export function setCancellingState(boolean) {
    return {
        type: actionTypes.SET_CANCELLING_STATE,
        boolean: boolean
    };
};

export function setCheckoutLoadingState(boolean) {
    return {
        type: actionTypes.SET_CHECKOUT_LOADING_STATE,
        boolean: boolean
    };
};