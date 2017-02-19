import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import allDataReducer from "./allDataReducer";
import viewDataReducer from "./viewDataReducer";
import pageNumReducer from "./pageNumReducer";
import filteredDataReducer from "./filteredDataReducer";

const reducers = combineReducers({
    allData: allDataReducer, // полные данные, получаемые при асинхронном GET-запросе
    viewData: viewDataReducer, // те данные, которые выводятся для отображения (например, первые 50 картинок)
    pageNum: pageNumReducer, // номер страницы с картинками
    filteredData: filteredDataReducer,
    routing: routerReducer
});

export default reducers;
