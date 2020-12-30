import actionTypes from "./../action/_actionTypes";
const initialState = {
  Teachers: [],
  };
export const getAllTeachersReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.GET_ALL_TEACHERS_RESPONSE_ACTION:
    
        return {
          ...state,
          ...payload,
          type: "success-get-teachers",
        };
      case actionTypes.GET_ALL_TEACHERS_ERROR_ACTION:
    
        return {
          Teachers:[],
          data:payload,
          type: "error-get-teachers",
        };
      case actionTypes.GET_ALL_TEACHERS_LOADING_ACTION:
        return {
          ...state,
         type:"loading-get-teachers",
        };
      default:
        return state;
    }
  };