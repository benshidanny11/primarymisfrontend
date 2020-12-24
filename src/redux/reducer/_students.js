import actionTypes from "./../action/_actionTypes";
const initialState = {
  students: null,
};
const createInitialState = {
  createdStudent: null,
};
const updateInitialState = {
  updatedSudent: null,
};
const deleteInitialState = {
  deleteData: null,
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
        students: [],
        data: payload,
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
        payload,
      };
    case actionTypes.GET_ALL_CLASSES_RESPONSE_ACTION:
      return {
        ...state,
        classes: payload,
      };
    case actionTypes.CREATE_STUDENT_RESPONSE_ACTION:
      return {
        ...state,
        ...payload,
        isCreated: true,
        type: "success",
        
      };
    case actionTypes.CREATE_STUDENT_ERROR_ACTION:
      return {
        ...state,
        ...payload,
        type: "error",
      };
    case actionTypes.CREATE_STUDENT_LOADING_ACTION:
      return {
        ...state,
        ...payload,
        type:"loading"
      };
    default:
      return state;
  }
};

export const createStudentReducer = (state = createInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.CREATE_STUDENT_RESPONSE_ACTION:
      return {
        ...state,
        createdStudent:payload,
        type: "success-create",
      };
    case actionTypes.CREATE_STUDENT_ERROR_ACTION:
      return {
        ...state,
        payload,
        type: "error-create",
      };
    case actionTypes.CREATE_STUDENT_LOADING_ACTION:
      return {
        ...state,
       type:"loading-create",
      };
    default:
      return state;
  }
};

export const deleteStudentReducer = (state = deleteInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.DELETE_STUDENT_RESPONSE_ACTION:
      return {
        ...state,
        ...payload,
        type: "success-delete",
      };
    case actionTypes.DELETE_STUDENT_ERROR_ACTION:
      return {
        ...state,
        payload,
        type: "error-delete",
      };
    case actionTypes.DELETE_STUDENT_LOADING_ACTION:
      return {
        ...state,
       type:"loading-delete",
      };
    default:
      return state;
  }
};

export const updateStudentReducer = (state = updateInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.UPDATE_STUDENT_RESPONSE_ACTION:
      return {
        ...state,
        createdStudent:payload,
        type: "success-update",
      };
    case actionTypes.UPDATE_STUDENT_ERROR_ACTION:
      return {
        ...state,
        payload,
        type: "error-update",
      };
    case actionTypes.UPDATE_STUDENT_LOADING_ACTION:
      return {
        ...state,
       type:"loading-update",
      };
    default:
      return state;
  }
};
