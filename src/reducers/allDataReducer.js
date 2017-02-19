const allDataReducer = (state=[], action) => {
    if (action.type === "IMG_DATA_RECEIVED") {
        state = action.payload;
    } 
    return state;
}

export default allDataReducer;
