import axios from "axios";
import actionType from "./_actionTypes";
import cookie from "react-cookies";
import dotenv from "dotenv";

const getAllSUbjectPointsInTermAPI =
  "https://primaryims.herokuapp.com/api/points/AllInterm";
const getSubjectsByLevelAPI =
  "https://primaryims.herokuapp.com/api/subjects/levels";
const getSubjectsByTeacherAPI =
  "https://primaryims.herokuapp.com/api/subjects/";
const createPointsAPI = "https://primaryims.herokuapp.com/api/points/create";
const updatePointsAPI = "https://primaryims.herokuapp.com/api/points/update";
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
  year
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
        year
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

export const updatePointsAction = ({
  levelid,
  subjectname,
  catone,
  cattwo,
  exam,
  studentid,
}) => async (dispatch) => {
  dispatch({
    type: actionType.UPDATE_POINTS_LOADING_ACTION,
    payload: { type: "loading-update-point" },
  });
  try {
    const { data } = await axios.put(
      `${updatePointsAPI}/${levelid}/${subjectname}/${studentid}`,

      {
        catone,
        cattwo,
        exam,
      },
      {
        headers: {
          "Content-Type": "application/json",
          token: cookie.load("primary-mis-token"),
        },
      }
    );
    dispatch({
      type: actionType.UPDATE_POINTS_RESPONSE_ACTION,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: actionType.UPDATE_POINTS_ERROR_ACTION,
      payload: e.response,
    });
  }
};

export const getAllPointsAction = (levelid, subjectname,term,academicYear) => async (
  dispatch
) => {
  dispatch({
    type: actionType.GET_ALL_POINTS_LOADING_ACTION,
    payload: { type: "loading-get-points" },
  });
  try {
    axios
      .get(`${getAllSUbjectPointsInTermAPI}/${levelid}/${subjectname}/${term}/${academicYear}`, {
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
          payload: e,
        });
      });
  } catch (e) {
    dispatch({
      type: actionType.GET_ALL_STUDENTS_ERROR_ACTION,
      payload: e.response.data,
    });
  }
};
