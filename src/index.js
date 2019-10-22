import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import partsReducer from "./store/reducers/parts";
import userReducer from "./store/reducers/user";
import ordersReducer from "./store/reducers/orders";

import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';

const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({parts: partsReducer, user: userReducer, orders: ordersReducer});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

serviceWorker.unregister();
