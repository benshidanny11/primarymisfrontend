import actionTypes from "./../action/_actionTypes";
const initialState = {
  user: null,
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

export const updateUserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.UPDATE_USER_RESPONSE_ACTION:
      return {
        ...state,
        updatedUser:payload,
        type: "success-update-user",
      };
    case actionTypes.UPDATE_USER_ERROR_ACTION:
      return {
        ...state,
        payload,
        type: "error-update-user",
      };
    case actionTypes.UPDATE_USER_LOADING_ACTION:
      return {
        ...state,
       type:"loading-update-user",
      };
    default:
      return state;
  }
};
export const deleteUSerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.DELETE_USER_RESPONSE_ACTION:
      return {
        ...state,
        ...payload,
        type: "success-delete-user",
      };
    case actionTypes.DELETE_USER_ERROR_ACTION:
      return {
        ...state,
        payload,
        type: "error-delete-user",
      };
    case actionTypes.DELETE_USER_LOADING_ACTION:
      return {
        ...state,
       type:"loading-delete-user",
      };
    default:
      return state;
  }
};

export const getOneUserReducer=(state=initialState,action)=>{
  const { type, payload } = action;
 switch(type){
  case actionTypes.GET_ONE_USER_RESPONSE_ACTION:
    return {
      ...state,
      ...payload,
      type: "success-get-one-user",
    };

  case actionTypes.GET_ONE_USER_ERROR_ACTION:
    return {
      user: [],
      data: payload,
      type: "error-get-one-user",
    };

  case actionTypes.GET_ONE_USER_LOADING_ACTION:
    return {
      ...state,
      type:payload.type,
    };
default:
  return state;
 }
}

export const getPaginatedUsersReducer = (state = getUSersInitialState, action) => {
 
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_PAGINATED_USERS_RESPONSE_ACTION:
      
      return {
        ...state,
        ...payload,
        isFound: true,
        type: "success-get-paginated-users",
        
      };

    case actionTypes.GET_PAGINATED_USERS_ERROR_ACTION:
      return {
        ...state,
        user: { ...payload },
        type: "error-get-paginated-users",
      };

    case actionTypes.GET_PAGINATED_USERS_LOADING_ACTION:
      return {
        ...state,
        ...payload,
      };
      default:
        return state;
       }
    }
    


