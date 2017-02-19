import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from "redux";
import axios from 'axios';
import thunk from 'redux-thunk';
import { Router, Route, hashHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import Promise from "promise-polyfill";

import Layout from "./Layout";
import { dataUrl } from "./constants";
import reducers from "./reducers";
import { IMG_DATA_RECEIVED_ACTION, ERROR_ACTION } from "./actions";

const middleware = applyMiddleware(thunk);
const store = createStore(reducers, middleware);

if (!window.Promise) {
    window.Promise = Promise;
}
store.dispatch((dispatch) => {
    axios.get(dataUrl)
        .then((response) => {
            dispatch({type: IMG_DATA_RECEIVED_ACTION, payload: response.data });
        }).catch((err) => { dispatch({type: ERROR_ACTION, payload: err}); });
});

const history = syncHistoryWithStore(hashHistory, store);
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/(:pageNum)" component={Layout}>
            </Route>
        </Router>
    </Provider>
, document.getElementById('app'));
