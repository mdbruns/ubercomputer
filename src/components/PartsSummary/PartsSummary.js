import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import shortid from "shortid";

import classes from "./PartsSummary.module.css";

function partsSummary(props) {
    let summaryContent = [];

    if (props.history.location.pathname === "/checkout") {
        for (let category in props.selectedParts) {
            let partNameDisplay = props.selectedParts[category].name;

            if (category === "videoCard") {
                if (props.isCrossfireSLICompatibleSystem) {
                    partNameDisplay += " (2x Dual Video Cards)";
                }
                else {
                    partNameDisplay += " (Single Video Card)";
                }
            }

            summaryContent.push(
                <div key={shortid.generate()} className={classes.SummaryRow}>
                    <p className={classes.Text}><span className={classes.Category}>{props.headings[category]}</span> : <span>{partNameDisplay}</span></p>
                    <p className={classes.Price}>${category === "videoCard" && props.isCrossfireSLICompatibleSystem ? props.selectedParts[category].price * 2 : props.selectedParts[category].price}</p>
                </div>
            );
        }
    }
    else {
        for (let category in props.parts) {
            let partNameDisplay = "None";
            
            if (props.parts[category]) {
                partNameDisplay = props.parts[category].name;
            }

            if (category === "videoCard") {
                if (props.isCrossfireSLICompatibleSystem) {
                    partNameDisplay += " (2x Dual Video Cards)";
                }
                else {
                    partNameDisplay += " (Single Video Card)";
                }
            }

            summaryContent.push(
                <div key={shortid.generate()} className={classes.SummaryRow}>
                    <p className={classes.Text}><span className={classes.Category}>{props.headings[category]}</span> : <span>{partNameDisplay}</span></p>
                    <p className={classes.Price}>${props.parts[category] ? props.parts[category].price : 0}</p>
                </div>
            );
        }
    }

    return (
        <div className={classes.PartsSummary}>
            {props.history.location.pathname === "/checkout" ? <h2 style={{fontSize: "20px"}}>SELECTED PARTS</h2> : null}
            {summaryContent}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        selectedParts: state.parts.selections,
        headings: state.parts.headings,
        isCrossfireSLICompatibleSystem: state.parts.isCrossfireSLICompatibleSystem
    };
}

export default connect(mapStateToProps)(withRouter(partsSummary));