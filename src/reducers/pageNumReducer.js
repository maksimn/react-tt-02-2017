import { initPageNum } from "../constants";
import { FILTER_DATA_ACTION, PAGINATION_LINK_CLICK_ACTION } from "../actions";

const pageNumReducer = (state=initPageNum, action) => {
    if(action.type === PAGINATION_LINK_CLICK_ACTION) {
        state = action.payload;
    } else if (action.type === FILTER_DATA_ACTION) {
        state = 1;
    }
    return state;
}

export default pageNumReducer;
