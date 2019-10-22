import React from "react";
import { connect } from "react-redux";
import shortid from "shortid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCircle, faCheck } from "@fortawesome/free-solid-svg-icons";
import classes from "./Sidebar.module.css";

function sidebar(props) {
    const links = [];
    links.push(<p key={shortid.generate()} className={classes.Link + " " + classes.Required} onClick={() => props.click(props.refs.buildSettings)}>
                    <FontAwesomeIcon className={classes.IconSelected} icon={faCheck}/>Build Settings</p>);

    for (let category in props.headings) {
        let assignedClasses = [classes.Link];

        if (props.requiredChecks[category]) {
            assignedClasses.push(classes.Required);
        }

        links.push(<p key={shortid.generate()} className={assignedClasses.join(" ")} onClick={() => props.click(props.refs[category])}>
                        <FontAwesomeIcon className={props.selections[category].name.startsWith("None") ? classes.IconNoSelection : classes.IconSelected} 
                            icon={props.selections[category].name.startsWith("None") ? faCircle : faCheck}/>{props.headings[category]}</p>);
    }

    return (
        <div>
            <div className={classes.SidebarToggle}>
                <FontAwesomeIcon icon={faChevronRight}/>
            </div>
            <div className={classes.Sidebar}>
                <h3>Jump To</h3>
                {links}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        headings: state.parts.headings,
        selections: state.parts.selections,
        requiredChecks: state.parts.requiredChecks
    };
};

export default connect(mapStateToProps)(sidebar);