import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as userActions from "../../store/actions/user";

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
        this.props.history.push("/");
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(userActions.logout())
    };
};

export default connect(null, mapDispatchToProps)(withRouter(Logout));