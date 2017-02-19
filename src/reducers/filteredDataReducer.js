import { FILTER_DATA_ACTION } from "../actions";

const filteredDataReducer = (state=[], action) => {
    if (action.type === FILTER_DATA_ACTION) {
        state = action.payload;
    }
    return state;
}

export default filteredDataReducer;
