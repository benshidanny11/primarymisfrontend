import actionTypes from "./../action/_actionTypes";
const initialState = {
    disableSearch: false,
  }
  const initialFilterState = {
    data:{}
  }
export const disableSearchReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case "DISABLE_SEARCH":
        return {
            disableSearch: payload,
        };
      default:
        return state;
    }
  };

  export const setFilterStudentDataReducer = (state = initialFilterState, action) => {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.SET_STUDENT_FILTER_DATA:
        return {
            data: payload,
        };
      default:
        return state;
    }
  };
  