import * as actionTypes from "../actions/actionTypes";

const initialState = {
    loading: false,
    subtotal: 0,
    enableProceedToCheckout: false,
    expressService: null,
    servicePrices: {
        standard: 30,
        express: 70
    },
    buildFeePrice: 100,
    isIntelBasedSystem: true,
    isNvidiaGPU: true,
    isCrossfireSLICompatibleSystem: false,
    requiredChecks: {
        motherboard: true,
        processor: true,
        memory: true,
        videoCard: true,
        powerSupply: true,
        computerCase: true,
        processorCooler: true,
        primaryHardDrive: true
    },
    headings: {
        computerCase: "Case",
        motherboard: "Motherboard",
        processor: "Processor",
        processorCooler: "Processor Cooler",
        powerSupply: "Power Supply",
        videoCard: "Video Card",
        memory: "System Memory",
        primaryHardDrive: "Primary Hard Drive",
        secondaryHardDrive: "Secondary Hard Drive",
        caseFan: "Extra Case Fans",
        opticalDrive: "Optical Drive",
        wifiAdapter: "Wifi Adapter",
        soundCard: "Sound Card",
        monitor: "Monitor",
        keyboard: "Keyboard",
        mouse: "Mouse",
        operatingSystem: "Operating System",
    },
    options: {
       computerCase: [],
       motherboard: [],
       processor: [],
       processorCooler: [],
       powerSupply: [],
       videoCard: [],
       memory: [],
       primaryHardDrive: [],
       secondaryHardDrive: [],
       caseFan: [],
       opticalDrive: [],
       wifiAdapter: [],
       soundCard: [],
       monitor: [],
       keyboard: [],
       mouse: [],
       operatingSystem: [] 
    },
    selections: {
        computerCase: {
            name: "None",
            price: 0
        },
        motherboard: {
            name: "None",
            price: 0
        },
        processor: {
            name: "None",
            price: 0
        },
        processorCooler: {
            name: "None",
            price: 0
        },
        powerSupply: {
            name: "None",
            price: 0
        },
        videoCard: {
            name: "None",
            price: 0
        },
        memory: {
            name: "None",
            price: 0
        },
        primaryHardDrive: {
            name: "None",
            price: 0
        },
        secondaryHardDrive: {
            name: "None",
            price: 0
        },
        caseFan: {
            name: "None",
            price: 0
        },
        opticalDrive: {
            name: "None",
            price: 0
        },
        wifiAdapter: {
            name: "None",
            price: 0
        },
        soundCard: {
            name: "None",
            price: 0
        },
        monitor: {
            name: "None",
            price: 0
        },
        keyboard: {
            name: "None",
            price: 0
        },
        mouse: {
            name: "None",
            price: 0
        },
        operatingSystem: {
            name: "None",
            price: 0
        }
    }
};

function calculateSubtotal(selections, isCrossfireSLICompatibleSystem) {
    let subtotalCalc = 0; 
           
    for (let category in selections) {
        subtotalCalc += selections[category].price;
    }

    if (isCrossfireSLICompatibleSystem) {
        subtotalCalc += selections.videoCard.price;
    }

    return subtotalCalc;
}

function validateProceedToCheckout(selections, requiredChecks) {
    let proceedToCheckoutCheck = true;

    for (let category in selections) {
        if (requiredChecks[category]) {
            proceedToCheckoutCheck = selections[category].name !== "None" && proceedToCheckoutCheck;
        }
    }

    return proceedToCheckoutCheck;
}

function resetCategoryStateAfterBuildSettingIsChanged(category, currentState, updatedState) {
    if (!currentState.selections[category].name.startsWith("None")) {
        const indexOfOldSelection = currentState.options[category].findIndex(option => option.id === currentState.selections[category].id);
        updatedState.options[category][indexOfOldSelection].isSelected = false;
    }

    updatedState.selections[category] = {
        name: "None",
        price: 0
    };
}

function reducer(currentState = initialState, action) {
   const updatedState = {...currentState};

   switch (action.type) {
       case actionTypes.INITIALIZE_PARTS_LOADING:
           updatedState.loading = true;
           break;
       case actionTypes.INITIALIZE_PARTS_SUCCESS:
            const motherboardOptions = [];
            const processorOptions = [];
            const memoryOptions = [];
            const primaryHardDriveOptions = [];
            const videoCardOptions = [];
            const powerSupplyOptions = [];
            const caseOptions = [];
            const operatingSystemOptions = [];
            const processorCoolerOptions = [];
            const secondaryHardDriveOptions = [];
            const caseFanOptions = [];
            const opticalDriveOptions = [];
            const monitorOptions = [];
            const keyboardOptions = [];
            const mouseOptions = [];
            const wifiAdapterOptions = [];
            const soundCardOptions = [];

            for (let part of action.parts) {
                switch (part.type) {
                    case "motherboard":
                        motherboardOptions.push(part);
                        break;
                    case "processor":
                        processorOptions.push(part);
                        break;
                    case "memory":
                        memoryOptions.push(part);
                        break;
                    case "hard drive":
                        if (part.name.endsWith("(Hard Disk)")) {
                            secondaryHardDriveOptions.push(part);
                        }
                        else {
                            primaryHardDriveOptions.push(part);
                        }

                        break;
                    case "video card":
                        videoCardOptions.push(part);
                        break;
                    case "power supply":
                        powerSupplyOptions.push(part);
                        break;
                    case "case":
                        caseOptions.push(part);
                        break;
                    case "operating system":
                        operatingSystemOptions.push(part);
                        break;
                    case "processor cooler":
                        processorCoolerOptions.push(part);
                        break;
                    case "case fan":
                        caseFanOptions.push(part);
                        break;
                    case "optical drive":
                        opticalDriveOptions.push(part);
                        break;
                    case "monitor":
                        monitorOptions.push(part);
                        break;
                    case "keyboard":
                        keyboardOptions.push(part);
                        break;
                    case "mouse":
                        mouseOptions.push(part);
                        break;
                    case "wifi adapter":
                        wifiAdapterOptions.push(part);
                        break;
                    case "sound card":
                        soundCardOptions.push(part);
                        break;
                    case "none":
                        part = {
                            ...part,
                            isSelected: true
                        };

                        operatingSystemOptions.unshift({...part, name: "None - Format Hard Drive Only - Install Your Own Operating System"});
                        secondaryHardDriveOptions.unshift(part);
                        caseFanOptions.unshift(part);
                        opticalDriveOptions.unshift(part);
                        monitorOptions.unshift(part);
                        keyboardOptions.unshift(part);
                        mouseOptions.unshift(part);
                        wifiAdapterOptions.unshift(part);
                        soundCardOptions.unshift(part);
                        break;
                    default:
                        break;
                }
            }

            updatedState.options = {
                operatingSystem: operatingSystemOptions,
                computerCase: caseOptions,
                motherboard: motherboardOptions,
                processor: processorOptions,
                processorCooler: processorCoolerOptions,
                powerSupply: powerSupplyOptions,
                videoCard: videoCardOptions,
                memory: memoryOptions,
                primaryHardDrive: primaryHardDriveOptions,
                secondaryHardDrive: secondaryHardDriveOptions,
                caseFan: caseFanOptions,
                opticalDrive: opticalDriveOptions,
                wifiAdapter: wifiAdapterOptions,
                soundCard: soundCardOptions,
                monitor: monitorOptions,
                keyboard: keyboardOptions,
                mouse: mouseOptions 
            };

            updatedState.loading = false;
            break;
        case actionTypes.INITIALIZE_PARTS_ERROR:
            updatedState.loading = false;
            break;
        case actionTypes.SELECT_PART:
           updatedState.selections = {
               ...currentState.selections,
               [action.category]: action.selectedPart
           };

           updatedState.options = {
               ...currentState.options,
               [action.category]: currentState.options[action.category].map(option => {
                    if (option.id === action.selectedPart.id) {
                        return {
                            ...option,
                            isSelected: true
                        };
                    }
                    else {
                        return {
                            ...option,
                            isSelected: false
                        };
                    }
                })
            };

           updatedState.subtotal = calculateSubtotal(updatedState.selections, updatedState.isCrossfireSLICompatibleSystem);
           updatedState.enableProceedToCheckout = validateProceedToCheckout(updatedState.selections, currentState.requiredChecks);
           localStorage.setItem("selections", JSON.stringify(updatedState.selections));
           break;
        case actionTypes.LOAD_SELECTIONS_FROM_LOCAL_STORAGE:
            for (let category in action.selections) {
                const matchingOption = updatedState.options[category].find(option => option.id === action.selections[category].id);
                
                if (matchingOption) {
                    updatedState.selections = {
                        ...updatedState.selections,
                        [category]: {...matchingOption}
                    };
                }
            }

            for (let category in updatedState.options) {
                updatedState.options[category] = updatedState.options[category].map(option => {
                    if (option.id === updatedState.selections[category].id) {
                        return {
                            ...option,
                            isSelected: true
                        };
                    }
                    else if (option.name.startsWith("None") && updatedState.selections[category].name.startsWith("None")) {
                        return {
                            ...option,
                            isSelected: true
                        };
                    }
                    else {
                        return {
                            ...option,
                            isSelected: false
                        };
                    }
                });
            }

            if (localStorage.getItem("isIntelBasedSystem")) {
                updatedState.isIntelBasedSystem = JSON.parse(localStorage.getItem("isIntelBasedSystem"));
            }

            if (localStorage.getItem("isNvidiaGPU")) {
                updatedState.isNvidiaGPU = JSON.parse(localStorage.getItem("isNvidiaGPU"));
            }

            if (localStorage.getItem("isCrossfireSLICompatibleSystem")) {
                updatedState.isCrossfireSLICompatibleSystem = JSON.parse(localStorage.getItem("isCrossfireSLICompatibleSystem"));
            }

            updatedState.subtotal = calculateSubtotal(updatedState.selections, updatedState.isCrossfireSLICompatibleSystem);
            updatedState.enableProceedToCheckout = validateProceedToCheckout(updatedState.selections, currentState.requiredChecks);
            break;
        case actionTypes.SET_EXPRESS_SERVICE:
            updatedState.expressService = action.boolean;
            break;
        case actionTypes.SET_CHIPSET_PREFERENCE:
            updatedState.isIntelBasedSystem = action.boolean;
            resetCategoryStateAfterBuildSettingIsChanged("processor", currentState, updatedState);
            resetCategoryStateAfterBuildSettingIsChanged("motherboard", currentState, updatedState);
            updatedState.subtotal = calculateSubtotal(updatedState.selections, updatedState.isCrossfireSLICompatibleSystem);
            updatedState.enableProceedToCheckout = false;
            localStorage.setItem("selections", JSON.stringify(updatedState.selections));
            localStorage.setItem("isIntelBasedSystem", updatedState.isIntelBasedSystem);
            break;
        case actionTypes.SET_GPU_BRAND_PREFERENCE:
            updatedState.isNvidiaGPU = action.boolean;
            resetCategoryStateAfterBuildSettingIsChanged("videoCard", currentState, updatedState);
            updatedState.subtotal = calculateSubtotal(updatedState.selections, updatedState.isCrossfireSLICompatibleSystem);
            updatedState.enableProceedToCheckout = false;
            localStorage.setItem("selections", JSON.stringify(updatedState.selections));
            localStorage.setItem("isNvidiaGPU", updatedState.isNvidiaGPU);
            break;
        case actionTypes.SET_CROSSFIRE_SLI_COMPATIBILITY_PREFERENCE:
            updatedState.isCrossfireSLICompatibleSystem = action.boolean;
            resetCategoryStateAfterBuildSettingIsChanged("motherboard", currentState, updatedState);
            resetCategoryStateAfterBuildSettingIsChanged("videoCard", currentState, updatedState);
            updatedState.subtotal = calculateSubtotal(updatedState.selections, updatedState.isCrossfireSLICompatibleSystem);
            updatedState.enableProceedToCheckout = false;
            localStorage.setItem("selections", JSON.stringify(updatedState.selections));
            localStorage.setItem("isCrossfireSLICompatibleSystem", updatedState.isCrossfireSLICompatibleSystem);
            break;
        case actionTypes.RESET_PARTS_STATE:
            updatedState.selections = {...initialState.selections};
            updatedState.options = {...initialState.options};
            updatedState.subtotal = 0;
            updatedState.enableProceedToCheckout = false;
            updatedState.expressService = null;
            updatedState.isIntelBasedSystem = true;
            updatedState.isNvidiaGPU = true;
            updatedState.isCrossfireSLICompatibleSystem = false;
            localStorage.removeItem("selections");
            localStorage.removeItem("isIntelBasedSystem");
            localStorage.removeItem("isNvidiaGPU");
            break;
        default:
            break;       
   }

   return updatedState;
}

export default reducer;