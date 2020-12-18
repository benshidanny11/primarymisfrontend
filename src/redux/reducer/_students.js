import actionTypes from "./../action/_actionTypes";
const initialState = {
  students: null,
};



export const studentReducer = (state = initialState, action) => {
 
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_ALL_STUDENTS_RESPONSE_ACTION:
      return {
        ...state,
        ...payload,
        isFound: true,
        type: "success",
        
      };

    case actionTypes.GET_ALL_STUDENTS_ERROR_ACTION:
      return {
        students:[],
        data:payload,
        type: "error",
      };

    case actionTypes.GET_ALL_STUDENTS_LOADING_ACTION:
      return {
        ...state,
        ...payload,
      };   

      case actionTypes.LEVEL_CHANGE:
          return {
              ...state,
              payload
          }
    default:
      return state;
  }
};