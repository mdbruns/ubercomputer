import * as actionTypes from "../actions/actionTypes";

const initialState = {
    enableCancelSelectedOrder: false,
    cancelling: false,
    loading: false
};

function reducer(currentState = initialState, action) {
    const updatedState = {...currentState};

    switch (action.type) {
        case actionTypes.ENABLE_CANCEL_SELECTED_ORDER:
            updatedState.enableCancelSelectedOrder = true;
            break;
        case actionTypes.DISABLE_CANCEL_SELECTED_ORDER:
            updatedState.enableCancelSelectedOrder = false;
            break;
        case actionTypes.SET_CANCELLING_STATE:
            updatedState.cancelling = action.boolean;
            break;
        case actionTypes.SET_CHECKOUT_LOADING_STATE:
            updatedState.loading = action.boolean;
        default:
            break;
    }

    return updatedState;
}

export default reducer;