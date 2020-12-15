import actionTypes from "./../action/_actionTypes";
const initialState = {
  user: null,
  data:{},
};
const createUserInitialState = {
  user: null,
};

const getUSersInitialState = {
  users: [],
};

export const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.LOGIN_RESPONSE_ACTION:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        type: "success",
        
      };

    case actionTypes.LOGIN_ERROR_ACTION:
      return {
        ...state,
        data: { ...payload },
        type: "error",
      };

    case actionTypes.LOGIN_LOADING_ACTION:
      return {
        ...state,
        ...payload,
      };
    case actionTypes.DECODE_TOKEN:
      return {
        ...state,
        user: payload,
      };
    case actionTypes.DECODE_TOKEN_ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }
};
export const createUserReducer = (state = createUserInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.CREATE_USER_RESPONSE_ACTION:
      return {
        ...state,
        ...payload,
        isCreated: true,
        type: "success",
        
      };

    case actionTypes.CREATE_USER_ERROR_ACTION:
      return {
        ...state,
        data: { ...payload },
        type: "error",
      };

    case actionTypes.CREATE_USER_LOADING_ACTION:
      return {
        ...state,
        ...payload,
      };

      case actionTypes.CREATE_USER_REFRESH_ACTION:
        return {
          payload,
          type: null,
          
        };

    default:
      return state;
  }
};

export const getAllUsersReducer = (state = getUSersInitialState, action) => {
 
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_ALL_USERS_RESPONSE_ACTION:
      
      return {
        ...state,
        ...payload,
        isFound: true,
        type: "success",
        
      };

    case actionTypes.GET_ALL_USERS_ERROR_ACTION:
      return {
        ...state,
        user: { ...payload },
        type: "error",
      };

    case actionTypes.GET_ALL_USERS_LOADING_ACTION:
      return {
        ...state,
        ...payload,
      };

     

    default:
      return state;
  }
};