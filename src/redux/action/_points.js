import axios from "axios";
import actionType from "./_actionTypes";
import cookie from "react-cookies";
import dotenv from "dotenv";


const getAllSUbjectPointsAPI = "https://primaryims.herokuapp.com/api/points/all";
const getSubjectsByLevelAPI =
  "https://primaryims.herokuapp.com/api/subjects/levels";
const getSubjectsByTeacherAPI =
  "https://primaryims.herokuapp.com/api/subjects/";
const createPointsAPI = "https://primaryims.herokuapp.com/api/points/create";
dotenv.config();

export const createPointsAction = ({
  levelid,
  subjectname,
  catone,
  cattwo,
  exam,
  studentid,
  teacherid,
  term,
}) => async (dispatch) => {
  dispatch({
    type: actionType.CREATE_POINT_LOADING_ACTION,
    payload: { type: "loading-create-point" },
  });
  try {
    const { data } = await axios.post(
      createPointsAPI,

      {
        subjectname,
        catone,
        cattwo,
        exam,
        studentid,
        term,
        levelid,
        teacherid,
      },
      {
        headers: {
          "Content-Type": "application/json",
          token: cookie.load("primary-mis-token"),
        },
      }
    );
    dispatch({
      type: actionType.CREATE_POINT_RESPONSE_ACTION,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: actionType.CREATE_POINT_ERROR_ACTION,
      payload: e.response,
    });
  }
};

export const getAllPointsAction = (levelid,subjectname) => async (dispatch) => {

  dispatch({
    type: actionType.GET_ALL_POINTS_LOADING_ACTION,
    payload: { type: "loading-get-points" },
  });
  try {
 
    axios
      .get(`${getAllSUbjectPointsAPI}/${levelid}/${subjectname}`, {
        headers: {
          "Content-Type": "application/json",
          token: cookie.load("primary-mis-token"),
        },
      })
      .then((response) => {
        //  console.log(response)
        dispatch({
          type: actionType.GET_ALL_POINTS_RESPONSE_ACTION,
          payload: response.data,
        });
      })
      .catch((e) => {
        dispatch({
          type: actionType.GET_ALL_POINTS_ERROR_ACTION,
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
