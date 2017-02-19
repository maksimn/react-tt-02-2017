const filteredDataReducer = (state=[], action) => {
    if (action.type === "FILTER_DATA") {
        state = action.payload;
    }
    return state;
}

export default filteredDataReducer;
