import React from "react";
import { connect } from "react-redux";
import * as partActions from "../../store/actions/parts";

import Button from "../ui/Button/Button";

import classes from "./BuildSettings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk, faCheck } from "@fortawesome/free-solid-svg-icons";

import { faCircle } from "@fortawesome/free-regular-svg-icons";

const buildSettings = React.forwardRef((props, ref) => {
    return (
        <div className={classes.BuildSettings} ref={ref}>
            <h2 className={classes.Heading}>BUILD SETTINGS</h2>
            <div className={classes.Setting}>
                <p className={classes.SettingDescription}><FontAwesomeIcon icon={faAsterisk} className={classes.Icon}/>Processor Brand</p>
                <Button buttonType="BuildSetting" isSelected={props.isIntelBasedSystem} click={() => props.onSetChipsetPreference(true)}>
                    {props.isIntelBasedSystem ? <FontAwesomeIcon icon={faCheck} className={classes.Icon}/> : <FontAwesomeIcon icon={faCircle} className={classes.Icon}/>}Intel</Button>
                <Button buttonType="BuildSetting" isSelected={!props.isIntelBasedSystem} click={() => props.onSetChipsetPreference(false)}>
                    {!props.isIntelBasedSystem ? <FontAwesomeIcon icon={faCheck} className={classes.Icon}/> : <FontAwesomeIcon icon={faCircle} className={classes.Icon}/>}AMD</Button>
            </div>
            <div className={classes.Setting}>
                <p className={classes.SettingDescription}><FontAwesomeIcon icon={faAsterisk} className={classes.Icon}/>Graphics Card Brand</p>
                <Button buttonType="BuildSetting" isSelected={props.isNvidiaGPU} click={() => props.onSetGPUBrandPreference(true)}>
                    {props.isNvidiaGPU ? <FontAwesomeIcon icon={faCheck} className={classes.Icon}/> : <FontAwesomeIcon icon={faCircle} className={classes.Icon}/>}Nvidia</Button>
                <Button buttonType="BuildSetting" isSelected={!props.isNvidiaGPU} click={() => props.onSetGPUBrandPreference(false)}>
                    {!props.isNvidiaGPU ? <FontAwesomeIcon icon={faCheck} className={classes.Icon}/> : <FontAwesomeIcon icon={faCircle} className={classes.Icon}/>}AMD</Button>
            </div>
            <div className={classes.Setting}>
                <p className={classes.SettingDescription}><FontAwesomeIcon icon={faAsterisk} className={classes.Icon}/>{props.isNvidiaGPU ? "SLI" : "Crossfire"} (Dual Video Cards)</p>
                <Button buttonType="BuildSetting" isSelected={!props.isCrossfireSLICompatible} click={() => props.onSetCrossfireSLICompatibilityPreference(false)}>
                    {!props.isCrossfireSLICompatible ? <FontAwesomeIcon icon={faCheck} className={classes.Icon}/> : <FontAwesomeIcon icon={faCircle} className={classes.Icon}/>}No</Button>
                <Button buttonType="BuildSetting" isSelected={props.isCrossfireSLICompatible} click={() => props.onSetCrossfireSLICompatibilityPreference(true)}>
                    {props.isCrossfireSLICompatible ? <FontAwesomeIcon icon={faCheck} className={classes.Icon}/> : <FontAwesomeIcon icon={faCircle} className={classes.Icon}/>}Yes</Button>
            </div>
        </div>
    );
});

const mapStateToProps = state => {
    return {
        isIntelBasedSystem: state.parts.isIntelBasedSystem,
        isNvidiaGPU: state.parts.isNvidiaGPU,
        isCrossfireSLICompatible: state.parts.isCrossfireSLICompatibleSystem
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetChipsetPreference: boolean => dispatch(partActions.setChipsetPreference(boolean)),
        onSetGPUBrandPreference: boolean => dispatch(partActions.setGPUBrandPreference(boolean)),
        onSetCrossfireSLICompatibilityPreference: boolean => dispatch(partActions.setCrossfireSLICompatibilityPreference(boolean))
    };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(buildSettings);