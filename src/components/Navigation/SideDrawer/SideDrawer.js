import React from "react";

import NavLinks from "../NavLinks/NavLinks";
import Backdrop from "../../ui/Backdrop/Backdrop";

import classes from "./SideDrawer.module.css";

function sideDrawer(props) {
    let attachedClasses = classes.SideDrawer + " ";
    
    if (props.showSideDrawer) {
        attachedClasses += classes.open; 
    }
    else {
        attachedClasses += classes.close;
    }

    return (
        <React.Fragment>
            <Backdrop show={props.showSideDrawer} click={props.closeSideDrawer}></Backdrop>
            <div className={attachedClasses}>
                <nav>
                    <NavLinks isAuthenticated={props.isAuthenticated} click={props.closeSideDrawer}/>
                </nav>
            </div>
        </React.Fragment>
    )
}

export default sideDrawer;