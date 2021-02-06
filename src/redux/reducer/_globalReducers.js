import actionTypes from "./../action/_actionTypes";
const initialState = {
  disableSearch: false,
};
const initialFilterState = {
  data: {},
};
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

export const setFilterStudentDataReducer = (
  state = initialFilterState,
  action
) => {
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

export const handleChangePageReducer = ( state = { currentPage: 1},action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.PAGE_PREV_ACTION:
      return {
        currentPage: payload,
      };
    case actionTypes.PAGE_NEXT_ACTION:
      return {
        currentPage: payload,
      };
      case actionTypes.POINT_PAGE_NEXT_ACTION:
        return {
          currentPage: payload,
        };
        case actionTypes.POINT_PAGE_PREV_ACTION:
          return {
            currentPage: payload,
          };
          case actionTypes.USER_PAGE_PREV_ACTION:
          return {
            currentPage: payload,
          };
          case actionTypes.USER_PAGE_NEXT_ACTION:
          return {
            currentPage: payload,
          };
    default:
      return state;
  }
};

export const handleTotalPageReducer = (state = { totalPages: 1 }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.TOTAL_PAGE:
      return {
        totalPages: payload,
      };
      case actionTypes.POINT_TOTAL_PAGE:
        return {
          totalPages: payload,
        };
        case actionTypes.USER_TOTAL_PAGE:
        return {
          totalPages: payload,
        };
    default:
      return state;
  }
};
