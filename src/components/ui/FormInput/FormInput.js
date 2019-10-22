import React from "react";
import classes from "./FormInput.module.css";

function formInput(props) {
    let inputDisplay = null;
    const assignedClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        assignedClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ("input"):
            inputDisplay = <input className={assignedClasses.join(" ")} onChange={props.changed} {...props.elementConfig} value={props.value}/>;
            break;
        case ("textarea"):
            inputDisplay = <textarea className={assignedClasses.join(" ")} onChange={props.changed} {...props.elementConfig} value={props.value}/>;
            break;
        case ("select"):
            inputDisplay = (
                <select className={assignedClasses.join(" ")} onChange={props.changed} value={props.value}>
                    {props.elementConfig.options.map(nextOption => (
                        <option key= {nextOption.value} value={nextOption.value}>{nextOption.displayValue}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputDisplay = <input className={assignedClasses.join(" ")} onChange={props.changed} {...props.elementConfig} value={props.value}/>;
    }

    return (
        <div className={classes.FormInput}>
            {inputDisplay}
        </div>
    );
}

export default formInput;