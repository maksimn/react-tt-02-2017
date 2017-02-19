import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from "redux";
import axios from 'axios';
import thunk from 'redux-thunk';

import { Router, Route, hashHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

import Layout from "./Layout";
import { dataUrl, numImgsOnPage } from "./constants";
import reducers from "./reducers";

const middleware = applyMiddleware(thunk);
const store = createStore(reducers, middleware);

store.dispatch((dispatch) => {
    axios.get(dataUrl)
        .then((response) => {
            dispatch({type:"IMG_DATA_RECEIVED", payload: response.data });
        }).catch((err) => { dispatch({type:"ERROR", payload: err}); });
});

const history = syncHistoryWithStore(hashHistory, store);
const app = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/(:pageNum)" component={Layout}>
            </Route>
        </Router>
    </Provider>
, app);
