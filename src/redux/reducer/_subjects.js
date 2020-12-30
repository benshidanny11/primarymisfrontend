import actionTypes from "./../action/_actionTypes";
const initialState = {
  subjects: [],
  };
export const getAllSubjectsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.GET_ALL_SUBJECTS_RESPONSE_ACTION:
        
        return {
          ...state,
          ...payload,
          type: "success-get-subject",
        };
      case actionTypes.GET_ALL_SUBJECTS_ERROR_ACTION:
        return {
          Subjects:[],
          data:payload,
          type: "error-get-subject",
        };
      case actionTypes.GET_ALL_SUBJECTS_LOADING_ACTION:
        return {
          ...state,
         type:"loading-get-subject",
        };
      default:
        return state;
    }
  };
  export const createSubjectReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.CREATE_SUBJECT_RESPONSE_ACTION:
        return {
          ...state,
          ...payload,
          type: "success-create-subject",
        };
      case actionTypes.CREATE_SUBJECT_ERROR_ACTION:
        return {
          ...state,
          ...payload,
          type: "error-create-subject",
        };
      case actionTypes.CREATE_SUBJECT_LOADING_ACTION:
        return {
          ...state,
         type:"loading-create-subject",
        };
      default:
        return state;
    }
  };
  export const updateSubjectReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.UPDATE_SUBJECT_RESPONSE_ACTION:
        return {
          ...state,
          ...payload,
          type: "success-update-subject",
        };
      case actionTypes.UPDATE_SUBJECT_ERROR_ACTION:
        return {
          ...state,
          ...payload,
          type: "error-update-subject",
        };
      case actionTypes.UPDATE_SUBJECT_LOADING_ACTION:
        return {
          ...state,
         type:"loading-update-subject",
        };
      default:
        return state;
    }
  };