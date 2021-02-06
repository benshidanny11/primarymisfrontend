import actionTypes from "./../action/_actionTypes";
const initialState = {
  points: [],
  };
const hideinitialState = {
  showModal: false,
}
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
  export const updatePointReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.UPDATE_POINTS_RESPONSE_ACTION:
        return {
          ...state,
          ...payload,
          type: "success-update-point",
        };
      case actionTypes.UPDATE_POINTS_ERROR_ACTION:
        return {
          ...state,
          ...payload,
          type: "error-update-point",
        };
      case actionTypes.UPDATE_POINTS_LOADING_ACTION:
        return {
          ...state,
         type:"loading-update-point",
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
          points:[],
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
  export const getStudentReportDataInTermReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.GET_STUDENT_REPORT_RESPONSE_ACTION:
        return {
          ...state,
          ...payload,
          type: "success-get-report-data",
        };
      case actionTypes.GET_STUDENT_REPORT_ERROR_ACTION:
        return {
          ...state,
          ...payload,
          reportdata:[],
          type: "error-get-report-data",
        };
      case actionTypes.GET_STUDENT_REPORT_LOADING_ACTION:
        return {
          ...state,
         type:"loading-get-report-data",
        };
      default:
        return state;
    }
  };
  export const getStudentAnualReportDataReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.GET_STUDENT_ANUAL_REPORT_RESPONSE_ACTION:
        return {
          ...state,
          ...payload,
          type: "success-get-anual-report-data",
        };
      case actionTypes.GET_STUDENT_ANUAL_REPORT_ERROR_ACTION:
        return {
          ...state,
          ...payload,
          reportdata:[],
          type: "error-get-anual-report-data",
        };
      case actionTypes.GET_STUDENT_ANUAL_REPORT_LOADING_ACTION:
        return {
          ...state,
         type:"loading-get-anual-report-data",
        };
      default:
        return state;
    }
  };
  
  export const hideModalReducer = (state = hideinitialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.HIDE_MODAL_ACTION:
        return {
          showModal: payload,
        };
      default:
        return state;
    }
  };
  
  export const getMarksByStudentReducer=(state=initialState,action)=>{
    const { type, payload } = action;
   switch(type){
    case actionTypes.GET_ONE_STUDENT_IN_MARKS_RESPONSE_ACTION:
      return {
        ...state,
        ...payload,
        isFound: true,
        type: "success-get-marks-by-student",
      };
  
    case actionTypes.GET_ONE_STUDENT_IN_MARKS_ERROR_ACTION:
      return {
        students: [],
        data: payload,
        type: "error-get-marks-by-student",
      };
  
    case actionTypes.GET_ONE_STUDENT_IN_MARKS_LOADING_ACTION:
      return {
        ...state,
        type:payload.type,
      };
  default:
    return state;
   }
  }

  export const getPaginationPointsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.GET_PAGINATED_POINTS_RESPONSE_ACTION:
        return {
          ...state,
          ...payload,
          type: "success-get-pagination-point",
        };
      case actionTypes.GET_PAGINATED_POINTS_ERROR_ACTION:
        return {
          ...state,
          points:[],
          type: "error-get-pagination-point",
        };
      case actionTypes.GET_PAGINATED_POINTS_LOADING_ACTION:
        return {
          ...state,
         type:"loading-get-pagination-point",
        };
      default:
        return state;
    }
  };