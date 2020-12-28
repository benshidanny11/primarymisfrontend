import actionTypes from "./../action/_actionTypes";
const initialState = {
  points: [],
  };

  export const createPointReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.CREATE_POINT_RESPONSE_ACTION:
        return {
          ...state,
          ...payload,
          type: "success-create-point",
        };
      case actionTypes.CREATE_POINT_ERROR_ACTION:
        return {
          ...state,
          ...payload,
          type: "error-create-point",
        };
      case actionTypes.CREATE_POINT_LOADING_ACTION:
        return {
          ...state,
         type:"loading-create-point",
        };
      default:
        return state;
    }
  };
  export const getPointsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.GET_ALL_POINTS_RESPONSE_ACTION:
        return {
          ...state,
          ...payload,
          type: "success-get-point",
        };
      case actionTypes.GET_ALL_POINTS_ERROR_ACTION:
        return {
          ...state,
          ...payload,
          type: "error-get-point",
        };
      case actionTypes.GET_ALL_POINTS_LOADING_ACTION:
        return {
          ...state,
         type:"loading-get-point",
        };
      default:
        return state;
    }
  };
  