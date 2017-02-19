import { initPageNum } from "../constants";

const pageNumReducer = (state=initPageNum, action) => {
    if(action.type === "PAGINGATION_LINK_CLICK") {
        state = action.payload;
    } else if (action.type === "FILTER_DATA") {
        state = 1;
    }
    return state;
}

export default pageNumReducer;
