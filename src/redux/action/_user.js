import axios from "axios";
import actionType from "./_actionTypes";
import jwt from "jsonwebtoken";
import cookie from "react-cookies";
import dotenv from "dotenv";
const loginAPI = "https://primaryims.herokuapp.com/api/user/login";
const createUserAPI = "https://primaryims.herokuapp.com/api/user/users/create";
const getUsersAPI = "https://primaryims.herokuapp.com/api/user/users/all";

dotenv.config();

export const loginAction = (loginData) => async (dispatch) => {
 
  dispatch({
    type: actionType.LOGIN_LOADING_ACTION,
    payload: { type: "loading" },
  });
  try {
    const { data } = await axios.post(loginAPI, {
      email: loginData.email,
      password: loginData.password,
    });

    dispatch({
      type: actionType.LOGIN_RESPONSE_ACTION,
      payload: data,
    });
  } catch (e) {
     // console.log(e)
    dispatch({
      type: actionType.LOGIN_ERROR_ACTION,
      payload: e.response.data,
    });
  }
};

export const createUserAction = (userData) => async (dispatch) => {

  dispatch({
    type: actionType.CREATE_USER_LOADING_ACTION,
    payload: { type: "loading" },
  });
  try {
    const { data } = await axios.post(
      createUserAPI,

      {
        names: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        phonenumber: userData.phone,
        role: userData.role,
        password:userData.password
      },
      {
        headers: {
          "Content-Type": "application/json",
          token: cookie.load("primary-mis-token"),
        },
      }
    );
    dispatch({
      type: actionType.CREATE_USER_RESPONSE_ACTION,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: actionType.CREATE_USER_ERROR_ACTION,
      payload: e.response,
    });
  }
};

export const createRefresh = () => async (dispatch) => {
  
  dispatch({
    type: actionType.CREATE_USER_REFRESH_ACTION,
    payload:null,
  });
  
};

export const getAllUsersAction = () => async (dispatch) => {
  
  dispatch({
    type: actionType.GET_ALL_USERS_LOADING_ACTION,
    payload: { type: "loading" },
  });
  try {
    const { data } = await axios.get(
      getUsersAPI,{
        headers: {
          "Content-Type": "application/json",
          token: cookie.load("primary-mis-token"),
        },
      }
    );
    
    dispatch({
      type: actionType.GET_ALL_USERS_RESPONSE_ACTION,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: actionType.GET_ALL_USERS_ERROR_ACTION,
      payload: e.response.data,
    });
  }
};



export const decodeToken = (token) => async (dispatch) => {
  try {
    const user = await jwt.verify(token, "primaryMIS@gmail.com130852");
    console.log("Decoded user",user)
    cookie.save("user",JSON.stringify(user))
    dispatch({
      type: actionType.DECODE_TOKEN,
      payload: user,
    });
    return user;
  } catch (error) {
    dispatch({
      type: actionType.DECODE_TOKEN_ERROR,
      payload: error,
    });
    return error;
  }
};
