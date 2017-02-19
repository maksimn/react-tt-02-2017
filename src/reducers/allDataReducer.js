import { IMG_DATA_RECEIVED_ACTION } from "../actions";

const allDataReducer = (state=[], action) => {
    if (action.type === IMG_DATA_RECEIVED_ACTION) {
        state = action.payload;
    } 
    return state;
}

export default allDataReducer;
