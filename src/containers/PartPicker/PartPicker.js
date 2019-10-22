import React, { Component } from "react";
import shortid from "shortid";
import { connect } from "react-redux";
import * as partActions from "../../store/actions/parts";

import Heading from "../../components/Heading/Heading";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";
import Options from "../../components/Options/Options";
import DeliveryDisclaimer from "../../components/DeliveryDisclaimer/DeliveryDisclaimer";
import Spinner from "../../components/ui/Spinner/Spinner";
import BuildSettings from "../../components/BuildSettings/BuildSettings";

const INTEL = 0;
const NVIDIA = 0;
const AMD = 1;

class PartPicker extends Component {
    state = {
        categories: {
            computerCase: {
                isHidden: false 
            },
            motherboard: {
                isHidden: false
            },
            processor: {
                isHidden: false
            },
            processorCooler: {
                isHidden: false 
            },
            powerSupply: {
                isHidden: false
            },
            videoCard: {
                isHidden: false
            },
            memory: {
                isHidden: false
            },
            primaryHardDrive: {
                isHidden: false
            },
            secondaryHardDrive: {
                isHidden: false 
            },
            caseFan: {
                isHidden: false 
            },
            opticalDrive: {
                isHidden: false
            },
            wifiAdapter: {
                isHidden: false
            },
            soundCard: {
                isHidden: false
            },
            monitor: {
                isHidden: false
            },
            keyboard: {
                isHidden: false
            },
            mouse: {
                isHidden: false
            },
            operatingSystem: {
                isHidden: false 
            }
        }
    };

    componentDidMount() {
        if (this.props.options.operatingSystem.length === 0) {
            this.props.onInitializeParts();
        }
    }

    optionsDisplayToggledHandler = category => {
        this.setState(prevState => ({
            ...prevState,
            categories: {
                ...prevState.categories,
                [category]: {
                    ...prevState.categories[category],
                    isHidden: !prevState.categories[category].isHidden
                }
            }
        }));
    };

    partSelectedHandler = (part, category) => {
        if (!part.isSelected) {
            this.props.onPartSelected(category, part);
        }
    };

    navigateToCategoryHandler = ref => {
        window.scrollTo(0, ref.current.offsetTop - 56);
    };

    render() {
        let refsForSidebarLinks = {};
        let categoriesDisplay = <Spinner/>;
        let buildSettingsDisplay = null;

        if (!this.props.loading) {
            const buildSettingsRef = React.createRef();
            refsForSidebarLinks = {buildSettings: buildSettingsRef};
            buildSettingsDisplay = <BuildSettings ref={buildSettingsRef}/>; 
            categoriesDisplay = [];

            for (let category in this.state.categories) {
                const ref = React.createRef();
                
                refsForSidebarLinks = {
                    ...refsForSidebarLinks,
                    [category]: ref
                }

                let options = this.props.options[category];

                if (category === "motherboard") {
                    if (this.props.isIntelBasedSystem) {
                        options = options.filter(option => option.chipset === INTEL);
                    }
                    else {
                        options = options.filter(option => option.chipset === AMD);
                    }

                    if (this.props.isCrossfireSLICompatibleSystem) {
                        if (this.props.isNvidiaGPU) {
                            options = options.filter(option => option.sliCompatible === true);
                        }
                        else {
                            options = options.filter(option => option.crossfireCompatible === true);
                        }
                    }
                }
                else if (category === "processor") {
                    if (this.props.isIntelBasedSystem) {
                        options = options.filter(option => option.chipset === INTEL);
                    }
                    else {
                        options = options.filter(option => option.chipset === AMD);
                    }
                }
                else if (category === "videoCard") {
                    if (this.props.isNvidiaGPU) {
                        options = options.filter(option => option.gpuBrand === NVIDIA);

                        if (this.props.isCrossfireSLICompatibleSystem) {
                            options = options.filter(option => option.sliCompatible === true)
                        }
                    }
                    else {
                        options = options.filter(option => option.gpuBrand === AMD);

                        if (this.props.isCrossfireSLICompatibleSystem) {
                            options = options.filter(option => option.crossfireCompatible === true);
                        }
                    }
                }

                categoriesDisplay.push(<Heading ref={ref} key={shortid.generate()} category={category} 
                                            heading={this.props.headings[category]} 
                                            isOptional={this.props.requiredChecks[category] ? false : true}
                                            isHidden={this.state.categories[category].isHidden} 
                                            click={this.optionsDisplayToggledHandler}/>);

                categoriesDisplay.push(<Options key={shortid.generate()} 
                                            category={category}
                                            options={options} 
                                            isOptional={this.props.requiredChecks[category] ? false : true}
                                            isHidden={this.state.categories[category].isHidden}
                                            selectPart={part => this.partSelectedHandler(part, category)}/>);
            }
        }

        return (
            <div>
                <Sidebar refs={refsForSidebarLinks} click={ref => this.navigateToCategoryHandler(ref)}/>
                <DeliveryDisclaimer/>
                {buildSettingsDisplay}
                {categoriesDisplay}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        headings: state.parts.headings,
        options: state.parts.options,
        selections: state.parts.selections,
        loading: state.parts.loading,
        isCrossfireSLICompatibleSystem: state.parts.isCrossfireSLICompatibleSystem,
        isIntelBasedSystem: state.parts.isIntelBasedSystem,
        isNvidiaGPU: state.parts.isNvidiaGPU,
        requiredChecks: state.parts.requiredChecks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPartSelected: (category, selectedPart) => dispatch(partActions.selectPart(category, selectedPart)),
        onInitializeParts: () => dispatch(partActions.asyncInitializeParts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartPicker);