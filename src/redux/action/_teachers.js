import axios from "axios";
import actionType from "./_actionTypes";
import jwt from "jsonwebtoken";
import cookie from "react-cookies";
import dotenv from "dotenv";

const getAllTeachersAPI =
  "https://primaryims.herokuapp.com/api/user/teachers";
const getSubjectsByLevelAPI =
  "https://primaryims.herokuapp.com/api/subjects/levels";
const createStudentAPI = "https://primaryims.herokuapp.com/api/student/create";
const updateStudentAPI = "https://primaryims.herokuapp.com/api/student/update";
const getClassesAPI = "https://primaryims.herokuapp.com/api/class/classes/";
const deleteStudentAPI = "https://primaryims.herokuapp.com/api/student/delete";


export const getAllTeachersAction = () => async (dispatch) => {

    dispatch({
      type: actionType.GET_ALL_TEACHERS_LOADING_ACTION,
      payload: { type: "loading-get-teachers" },
    });
    try {
   
      axios
        .get(getAllTeachersAPI, {
          headers: {
            "Content-Type": "application/json",
            token: cookie.load("primary-mis-token"),
          },
        })
        .then((response) => {
          dispatch({
            type: actionType.GET_ALL_TEACHERS_RESPONSE_ACTION,
            payload: response.data,
          });
        })
        .catch((e) => {
          dispatch({
            type: actionType.GET_ALL_TEACHERS_ERROR_ACTION,
            payload: e.response,
          });
        });
    } catch (e) {
      dispatch({
        type: actionType.GET_ALL_STUDENTS_ERROR_ACTION,
        payload: e.response.data,
      });
    }
  };
  