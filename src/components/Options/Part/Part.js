import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import classes from "./Part.module.css";

function part(props) {
    let assignedClasses = [classes.Part];
    let iconDisplay = <FontAwesomeIcon icon={faSquare} className={classes.Icon}/>;

    if (props.isSelected) {
        assignedClasses.push(classes.Selected);
        iconDisplay = <FontAwesomeIcon icon={faCheckSquare} className={classes.Icon}/>;
    }

    let nameDisplay = props.name;

    if (props.category === "videoCard") {
        if (props.isCrossfireSLICompatibleSystem) {
            nameDisplay = props.name + " (2x Dual Video Cards)";
        }
        else {
            nameDisplay = props.name + " (Single Video Card)";
        }
    }

    return (
        <div className={assignedClasses.join(" ")} onClick={props.click}>
            <div className={classes.PriceTab}>
                {iconDisplay}
                <span>${props.category === "videoCard" && props.isCrossfireSLICompatibleSystem ? props.price * 2 : props.price}</span>
            </div>
            <img className={classes.Image} src={props.imagePath} alt={props.altTag}/>
            <div className={classes.TextWrapper}>
                <p className={classes.PartName}>{nameDisplay}</p>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isCrossfireSLICompatibleSystem: state.parts.isCrossfireSLICompatibleSystem
    };
};

export default connect(mapStateToProps)(part);