import { initPageNum, numImgsOnPage } from "../constants";
import { FILTER_DATA_ACTION, PAGINATION_LINK_CLICK_ACTION, IMG_DATA_RECEIVED_ACTION } from "../actions";

const viewDataReducer = (state=[], action) => {
    if (action.type === IMG_DATA_RECEIVED_ACTION) {
        state = action.payload.slice((initPageNum - 1)*numImgsOnPage, initPageNum*numImgsOnPage);
    } else if(action.type === PAGINATION_LINK_CLICK_ACTION) {
        const allData = action.payload.allData;
        const pageNum = action.payload.pageNum;
        const filteredData = action.payload.filteredData;
        if (filteredData.length > 0) {
            state = filteredData.slice((pageNum - 1) * numImgsOnPage, pageNum * numImgsOnPage);
        } else {
            state = allData.slice((pageNum - 1) * numImgsOnPage, pageNum * numImgsOnPage);
        }        
    } else if (action.type === FILTER_DATA_ACTION) {
        state = action.payload.slice(0, numImgsOnPage);
    }
    return state;
}

export default viewDataReducer;
