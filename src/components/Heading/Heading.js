import React from "react";
import { connect } from "react-redux";

import classes from "./Heading.module.css";

const heading = React.forwardRef((props, ref) => {
    const assignedClasses = [classes.Heading];

    if (props.isHidden) {
        assignedClasses.push(classes.Hidden);
    }

    let optionalDisplay = <p className={classes.OptionalDisplay}>Required</p>;

    if (props.isOptional) {
        optionalDisplay = <p className={classes.OptionalDisplay}>Optional</p>;
    }

    return (
        <div className={assignedClasses.join(" ")} ref={ref} onClick={() => props.click(props.category)}>
            <div className={classes.HideOptionsToggle}>{props.isHidden ? "Expand" : "Collapse"}</div>
            <p className={classes.Text}>
                <span className={classes.Title}>{props.heading} : </span>
                <span>{props.selectedParts[props.category].name}</span>
            </p>
            {optionalDisplay}
        </div>
    );
});

const mapStateToProps = state => {
    return {
        selectedParts: state.parts.selections
    };
};

export default connect(mapStateToProps, null, null, {forwardRef: true})(heading);