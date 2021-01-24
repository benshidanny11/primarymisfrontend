import axios from "axios";
import actionType from "./_actionTypes";
import cookie from "react-cookies";
import dotenv from "dotenv";

const getAllSUbjectPointsInTermAPI =
  "https://primaryims.herokuapp.com/api/points/AllInterm";
const createPointsAPI = "https://primaryims.herokuapp.com/api/points/create";
const updatePointsAPI = "https://primaryims.herokuapp.com/api/points/update";
const getStudentReportDataInTermAPI="https://primaryims.herokuapp.com/api/points/studentspoints";
const getPointsByStudentAPI="https://primaryims.herokuapp.com/api/points/search"
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

export const getPointsByStudentAction = (levelid,subjectName,term,academicYear,seachQuery) => async (dispatch) => {
  dispatch({
    type: actionType.GET_ONE_STUDENT_IN_MARKS_LOADING_ACTION,
    payload: { type: "loading-get-marks-by-student" },
  });
  try {

    ///:levelid/:subjectname/:term/:year/:searchData
    axios
      .get(`${getPointsByStudentAPI}/${levelid}/${subjectName}/${term}/${academicYear}/${seachQuery}`, {
        headers: {
          "Content-Type": "application/json",
          token: cookie.load("primary-mis-token"),
        },
      })
      .then((response) => {
        dispatch({
          type: actionType.GET_ONE_STUDENT_IN_MARKS_RESPONSE_ACTION,
          payload: response.data,
        });
      })
      .catch((e) => {
        dispatch({
          type: actionType.GET_ONE_STUDENT_IN_MARKS_ERROR_ACTION,
          payload: e.response,
        });
      });
  } catch (e) {
    dispatch({
      type: actionType.GET_ONE_STUDENT_IN_MARKS_ERROR_ACTION,
      payload: e,
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
//84/2/1/2020-2021
export const getStudentReportDataInTermAction = (studentId, levelid,term,academicYear) => async (
  dispatch
) => {
  dispatch({
    type: actionType.GET_STUDENT_REPORT_ERROR_ACTION,
    payload: { type: "loading-get-report-data" },
  });
  try {

    axios
      .get(`${getStudentReportDataInTermAPI}/${studentId}/${levelid}/${term}/${academicYear}`, {
        headers: {
          "Content-Type": "application/json",
          token: cookie.load("primary-mis-token"),
        },
      })
      .then((response) => {
          // console.log(`here is report response ${response}`)
        dispatch({
          type: actionType.GET_STUDENT_REPORT_RESPONSE_ACTION,
          payload: response.data,
        });
      })
      .catch((e) => {
        dispatch({
          type: actionType.GET_STUDENT_REPORT_ERROR_ACTION,
          payload: e,
        });
      });
  } catch (e) {
    dispatch({
      type: actionType.GET,
      payload: e.response.data,
    });
  }
};
export const hideModalAction = (hideModal)=>(dispatch)=>{
  dispatch({
    type: actionType.HIDE_MODAL_ACTION,
    payload: hideModal,
  })
}
