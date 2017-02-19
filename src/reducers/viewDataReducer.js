import { initPageNum, numImgsOnPage } from "../constants";

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

export default viewDataReducer;
