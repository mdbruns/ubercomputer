import React from "react";

import classes from "./DeliveryDisclaimer.module.css";

function orderSuccess(props) {
    return (
        <div className={classes.DeliveryDisclaimer}>
            <p>We currently only deliver to addresses in the Portland and Salem metropolitan areas (Oregon). If that's where you're located, then please go ahead and select the parts for your custom PC below.</p>
        </div>
    );
}

export default orderSuccess;