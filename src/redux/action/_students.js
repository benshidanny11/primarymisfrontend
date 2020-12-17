import axios from "axios";
import actionType from "./_actionTypes";
import jwt from "jsonwebtoken";
import cookie from "react-cookies";
import dotenv from "dotenv";
const loginAPI = "https://primaryims.herokuapp.com/api/user/login";
const createUserAPI = "https://primaryims.herokuapp.com/api/user/users/create";
const getUsersAPI = "https://primaryims.herokuapp.com/api/user/users/all";
const getStudentssAPI="https://primaryims.herokuapp.com/api/student/students";
const getLevelsAPI="https://primaryims.herokuapp.com/api/student/students/";

dotenv.config();

// export const createUserAction = (userData) => async (dispatch) => {
//   dispatch({
//     type: actionType.CREATE_USER_LOADING_ACTION,
//     payload: { type: "loading" },
//   });
//   try {
//     const { data } = await axios.post(
//       createUserAPI,

//       {
//         names: `${userData.firstName} ${userData.lastName}`,
//         email: userData.email,
//         phonenumber: userData.phone,
//         role: userData.role,
//         password: userData.password,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           token: cookie.load("primary-mis-token"),
//         },
//       }
//     );
//     dispatch({
//       type: actionType.CREATE_USER_RESPONSE_ACTION,
//       payload: data,
//     });
//   } catch (e) {
//     dispatch({
//       type: actionType.CREATE_USER_ERROR_ACTION,
//       payload: e.response.data,
//     });
//   }
// };

export const getAllStudentsAction = (levelid) => async (dispatch) => {
  dispatch({
    type: actionType.GET_ALL_STUDENTS_LOADING_ACTION,
    payload: { type: "loading" },
  });
  try {
    const { data } = await axios.get(`${getStudentssAPI}/${levelid}`, {
      headers: {
        "Content-Type": "application/json",
        token: cookie.load("primary-mis-token"),
      },
    });
    dispatch({
      type: actionType.GET_ALL_STUDENTS_RESPONSE_ACTION,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: actionType.GET_ALL_STUDENTS_ERROR_ACTION,
      payload: e.response.data,
    });
  }
};

export const getLevelsAction = () => async (dispatch) => {
    dispatch({
      type: actionType.GET_ALL_STUDENTS_LOADING_ACTION,
      payload: { type: "loading" },
    });
    try {
      const { data } = await axios.get(getUsersAPI, {
        headers: {
          "Content-Type": "application/json",
          token: cookie.load("primary-mis-token"),
        },
      });
      dispatch({
        type: actionType.GET_ALL_STUDENTS_RESPONSE_ACTION,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: actionType.GET_ALL_STUDENTS_ERROR_ACTION,
        payload: e.response.data,
      });
    }
  };
  export const handleLevelChangeAction = (value) => async (dispatch) => {
 
    dispatch({
      type: actionType.LEVEL_CHANGE,
      payload: value,
    });
  };
  
