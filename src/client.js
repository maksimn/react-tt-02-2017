import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from "redux";
import axios from 'axios';
import thunk from 'redux-thunk';

import { Router, Route, hashHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { routerReducer } from 'react-router-redux';

import Layout from "./Layout";
import { dataUrl, numImgsOnPage, initPageNum } from "./constants";

const viewDataReducer = (state=[], action) => {
    if (action.type === "IMG_DATA_RECEIVED") {
        state = action.payload.slice((initPageNum - 1)*numImgsOnPage, initPageNum*numImgsOnPage);
    } else if(action.type === "PAGINGATION_LINK_CLICK") {
        const allData = action.payload.allData;
        const pageNum = action.payload.pageNum;
        const filteredData = action.payload.filteredData;
        if (filteredData.length > 0) {
            state = filteredData.slice((pageNum - 1) * numImgsOnPage, pageNum * numImgsOnPage);
        } else {
            state = allData.slice((pageNum - 1) * numImgsOnPage, pageNum * numImgsOnPage);
        }        
    } else if (action.type === "FILTER_DATA") {
        state = action.payload.slice(0, numImgsOnPage);
    }
    return state;
}

const pageNumReducer = (state=initPageNum, action) => {
    if(action.type === "PAGINGATION_LINK_CLICK") {
        state = action.payload;
    } else if (action.type === "FILTER_DATA") {
        state = 1;
    }
    return state;
}

const allDataReducer = (state=[], action) => {
    if (action.type === "IMG_DATA_RECEIVED") {
        state = action.payload;
    } 
    return state;
}

const filteredDataReducer = (state=[], action) => {
    if (action.type === "FILTER_DATA") {
        state = action.payload;
    }
    return state;
}

const reducers = combineReducers({
    allData: allDataReducer, // полные данные, получаемые при асинхронном GET-запросе
    viewData: viewDataReducer, // те данные, которые выводятся для отображения (например, первые 50 картинок)
    pageNum: pageNumReducer, // номер страницы с картинками
    filteredData: filteredDataReducer,
    routing: routerReducer
});

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
