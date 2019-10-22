import axios from "axios";
import * as actionTypes from "./actionTypes";

export function selectPart(category, selectedPart) {
    return {
        type: actionTypes.SELECT_PART,
        category: category,
        selectedPart: selectedPart
    };
};

export function setExpressService(boolean) {
    return {
        type: actionTypes.SET_EXPRESS_SERVICE,
        boolean: boolean
    };
};

function loadSelectionsFromLocalStorage() {
    return function(dispatch) {
        if (!localStorage.getItem("selections")) {
            return;
        }
        else {
            dispatch(setSelectionsFromLocalStorage(JSON.parse(localStorage.getItem("selections"))));
        }
    }
};

function setSelectionsFromLocalStorage(selections) {
    return {
        type: actionTypes.LOAD_SELECTIONS_FROM_LOCAL_STORAGE,
        selections: selections
    };
}

export function asyncInitializeParts() {
    return function(dispatch) {
        dispatch(initializePartsLoading());
        axios.get("https://ubercomputer-server.herokuapp.com/api/parts")
            .then(response => {
                dispatch(initializePartsSuccess(response.data));
                dispatch(loadSelectionsFromLocalStorage());
            })
            .catch(error => {
                console.log(error);
                dispatch(initializePartsError());
            });
    };
};

function initializePartsLoading() {
    return {
        type: actionTypes.INITIALIZE_PARTS_LOADING
    };
}

function initializePartsSuccess(parts) {
    return {
        type: actionTypes.INITIALIZE_PARTS_SUCCESS,
        parts: parts
    }
}

function initializePartsError() {
    return {
        type: actionTypes.INITIALIZE_PARTS_ERROR
    };
}

export function resetPartsState() {
    return {
        type: actionTypes.RESET_PARTS_STATE
    };
};

export function setChipsetPreference(boolean) {
    return {
        type: actionTypes.SET_CHIPSET_PREFERENCE,
        boolean: boolean
    };
};

export function setGPUBrandPreference(boolean) {
    return {
        type: actionTypes.SET_GPU_BRAND_PREFERENCE,
        boolean: boolean
    };
};

export function setCrossfireSLICompatibilityPreference(boolean) {
    return {
        type: actionTypes.SET_CROSSFIRE_SLI_COMPATIBILITY_PREFERENCE,
        boolean: boolean
    };
};