import React, {Component} from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        let showClass = "";
        
        if (this.props.show) {
            showClass = classes.show;
        }

        return (
            <React.Fragment>
                <Backdrop show={this.props.show} click={this.props.closeModal}></Backdrop>
                <div className={classes.Modal + " " + showClass}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    } 
}

export default Modal;