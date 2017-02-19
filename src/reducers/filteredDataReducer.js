import { FILTER_DATA_ACTION, IMG_DATA_RECEIVED_ACTION } from "../actions";

const filteredDataReducer = (state=[], action) => {
    if (action.type === FILTER_DATA_ACTION) {
        state = action.payload;
    } else if (action.type === IMG_DATA_RECEIVED_ACTION) {
        state = action.payload;
    } 
    return state;
}

export default filteredDataReducer;
