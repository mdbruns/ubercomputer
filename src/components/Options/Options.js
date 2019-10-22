import React from "react";

import Part from "./Part/Part";

import classes from "./Options.module.css";

function options(props) {
    const assignedClasses = [classes.Options];

    if (props.isHidden) {
        assignedClasses.push(classes.Hidden);
    }

    let optionsDisplay = null;

    if (!props.isHidden && props.options) {
        optionsDisplay = props.options.map(option => <Part key={option.id} category={props.category} name={option.name} price={option.price} isSelected={option.isSelected} imagePath={option.imagePath} click={() => props.selectPart(option)}/>);
    }

    return (
        <div className={assignedClasses.join(" ")}>
            {optionsDisplay}
        </div>
    );
}

export default options;