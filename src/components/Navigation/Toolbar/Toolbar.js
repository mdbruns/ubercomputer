import React from "react";

import NavLinks from "../NavLinks/NavLinks";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

import classes from "./Toolbar.module.css";

function toolbar(props) {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle click={props.toggleSideDrawer}></DrawerToggle>
            <nav className={classes.DesktopOnly}>
                <NavLinks isAuthenticated={props.isAuthenticated}/>
            </nav>
        </header>
    )
}

export default toolbar;