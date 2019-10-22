import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./containers/Layout/Layout";
import PartPicker from "./containers/PartPicker/PartPicker";
import Logout from "./containers/Logout/Logout";
import Spinner from "./components/ui/Spinner/Spinner";

import * as userActions from "./store/actions/user";
import './App.css';

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Login = React.lazy(() => import("./containers/Login/Login"));
const Register = React.lazy(() => import("./containers/Register/Register"));
const ChangePassword = React.lazy(() => import("./containers/ChangePassword/ChangePassword"));
const OrderSuccess = React.lazy(() => import("./components/OrderSuccess/OrderSuccess"));
const Contact = React.lazy(() => import("./components/Contact/Contact"));
const ForgotPassword = React.lazy(() => import('./containers/ForgotPassword/ForgotPassword'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/forgot" component={ForgotPassword}/>
        <Route path="/reset/:userId/:tokenId/:token" component={ChangePassword}/>
        <Route path="/register" component={Register}/>
        <Route path="/contact" component={Contact}/>
        <Route exact path="/" component={PartPicker}/>
        <Redirect to="/"/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          {this.props.enableProceedToCheckout ? <Route path="/checkout" component={Checkout}/> : null}
          <Route path="/update" component={Register}/>
          <Route path="/password" component={ChangePassword}/>
          <Route path="/success" component={OrderSuccess}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/contact" component={Contact}/>
          <Route exact path="/" component={PartPicker}/>
          <Redirect to="/"/>
        </Switch>
      )
    }

    return (
      <div className="App">
        <BrowserRouter>
          <Suspense fallback={<Spinner/>}>
            <Layout>
              {routes}
            </Layout>
          </Suspense>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.token !== null,
    enableProceedToCheckout: state.parts.enableProceedToCheckout
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(userActions.authenticateFromLocalStorage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
