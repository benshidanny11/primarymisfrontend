import actionTypes from "./../action/_actionTypes";
const initialState = {
  classes: [],
  };
export const getAllClassesReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.GET_ALL_CLASSES_RESPONSE_ACTION:
        
        return {
          ...state,
          ...payload,
          type: "success-get-class",
        };
      case actionTypes.GET_ALL_CLASSES_ERROR_ACTION:
        return {
          classes:[],
          data:payload,
          type: "error-get-classes",
        };
      case actionTypes.GET_ALL_CLASSES_LOADING_ACTION:
        return {
          ...state,
         type:"loading-get-classes",
        };
      default:
        return state;
    }
  };
// //   export const createSubjectReducer = (state = initialState, action) => {
// //     const { type, payload } = action;
// //     switch (type) {
// //       case actionTypes.CREATE_SUBJECT_RESPONSE_ACTION:
// //         return {
// //           ...state,
// //           ...payload,
// //           type: "success-create-subject",
// //         };
// //       case actionTypes.CREATE_SUBJECT_ERROR_ACTION:
// //         return {
// //           ...state,
// //           ...payload,
// //           type: "error-create-subject",
// //         };
// //       case actionTypes.CREATE_SUBJECT_LOADING_ACTION:
// //         return {
// //           ...state,
// //          type:"loading-create-subject",
// //         };
// //       default:
// //         return state;
// //     }
// //   };
// //   export const updateSubjectReducer = (state = initialState, action) => {
// //     const { type, payload } = action;
// //     switch (type) {
// //       case actionTypes.UPDATE_SUBJECT_RESPONSE_ACTION:
// //         return {
// //           ...state,
// //           ...payload,
// //           type: "success-update-subject",
// //         };
// //       case actionTypes.UPDATE_SUBJECT_ERROR_ACTION:
// //         return {
// //           ...state,
// //           ...payload,
// //           type: "error-update-subject",
// //         };
// //       case actionTypes.UPDATE_SUBJECT_LOADING_ACTION:
// //         return {
// //           ...state,
// //          type:"loading-update-subject",
// //         };
// //       default:
// //         return state;
// //     }
//   };