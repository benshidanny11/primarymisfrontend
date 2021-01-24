import axios from "axios";
import actionType from "./_actionTypes";
import cookie from "react-cookies";
import dotenv from "dotenv";
const getStudentssAPI = "https://primaryims.herokuapp.com/api/student/students";
const createStudentAPI = "https://primaryims.herokuapp.com/api/student/create";
const updateStudentAPI = "https://primaryims.herokuapp.com/api/student/update";
const getClassesAPI = "https://primaryims.herokuapp.com/api/class/classes/";
const deleteStudentAPI="https://primaryims.herokuapp.com/api/student/delete";
const searchStudentApI="https://primaryims.herokuapp.com/api/student/search";

dotenv.config();

export const createStudentAction = (studentData) => async (dispatch) => {
  dispatch({
    type: actionType.CREATE_STUDENT_LOADING_ACTION,
    payload: { type: "loading-create" },
  });
  try {
    const { data } = await axios.post(
      createStudentAPI,

      {
        studentnames: studentData.studentsNames,
        parentsemail: studentData.parentsEmail,
        parentsphonenumber: studentData.parentsPhone,
        levelid: studentData.studentLevel,
        classid: studentData.studentClass,
        year:studentData.year
      },
      {
        headers: {
          "Content-Type": "application/json",
          token: cookie.load("primary-mis-token"),
        },
      }
    );
    dispatch({
      type: actionType.CREATE_STUDENT_RESPONSE_ACTION,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: actionType.CREATE_STUDENT_ERROR_ACTION,
      payload: e.response,
    });
  }
};

export const updateStudentAction = (studentData) => async (dispatch) => {
  dispatch({
    type: actionType.UPDATE_STUDENT_LOADING_ACTION,
    payload: { type: "loading-update" },
  });
  try {
    const { data } = await axios.put(
      `${updateStudentAPI}/${studentData.id}/${studentData.currentYear}`,

      {
        studentnames: studentData.studentsNames,
        parentsemail: studentData.parentsEmail,
        parentsphonenumber: studentData.parentsPhone,
        levelid: studentData.studentClass,
        classid: studentData.studentLevel,
        year:studentData.year,
      },
      {
        headers: {
          "Content-Type": "application/json",
          token: cookie.load("primary-mis-token"),
        },
      }
    );
    dispatch({
      type: actionType.UPDATE_STUDENT_RESPONSE_ACTION,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: actionType.UPDATE_STUDENT_ERROR_ACTION,
      payload: e.response,
    });
  }
};

export const deleteStudentAction = (id) => async (dispatch) => {
  dispatch({
    type: actionType.DELETE_STUDENT_LOADING_ACTION,
    payload: { type: "loading-delete" },
  });
  try {
    const { data } = await axios.delete(
      `${deleteStudentAPI}/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          token: cookie.load("primary-mis-token"),
        },
      }
    );
    dispatch({
      type: actionType.DELETE_STUDENT_RESPONSE_ACTION,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: actionType.DELETE_STUDENT_ERROR_ACTION,
      payload: e.response,
    });
  }
};

export const getAllStudentsAction = ({levelid,academicYear}) => async (dispatch) => {
  dispatch({
    type: actionType.GET_ALL_STUDENTS_LOADING_ACTION,
    payload: { type: "loading" },
  });
  try {
    axios
      .get(`${getStudentssAPI}/${levelid}/${academicYear}`, {
        headers: {
          "Content-Type": "application/json",
          token: cookie.load("primary-mis-token"),
        },
      })
      .then((response) => {
        dispatch({
          type: actionType.GET_ALL_STUDENTS_RESPONSE_ACTION,
          payload: response.data,
        });
      })
      .catch((e) => {
        dispatch({
          type: actionType.GET_ALL_STUDENTS_ERROR_ACTION,
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

export const getOneStudentAction = (levelid,academicYear,seachQuery) => async (dispatch) => {
  dispatch({
    type: actionType.GET_ONE_STUDENT_LOADING_ACTION,
    payload: { type: "loading-get-one-student" },
  });
  try {
    axios
      .get(`${searchStudentApI}/${levelid}/${academicYear}/${seachQuery}`, {
        headers: {
          "Content-Type": "application/json",
          token: cookie.load("primary-mis-token"),
        },
      })
      .then((response) => {
        dispatch({
          type: actionType.GET_ONE_STUDENT_RESPONSE_ACTION,
          payload: response.data,
        });
      })
      .catch((e) => {
        dispatch({
          type: actionType.GET_ONE_STUDENT_ERROR_ACTION,
          payload: e.response,
        });
      });
  } catch (e) {
    dispatch({
      type: actionType.GET_ONE_STUDENT_ERROR_ACTION,
      payload: e,
    });
  }
};

export const getClassesAction = (levelid) => async (dispatch) => {
  dispatch({
    type: actionType.GET_ALL_CLASSES_LOADING_ACTION,
    payload: { type: "loading" },
  });
  try {
    const { data } = await axios.get(`${getClassesAPI}${levelid}`, {
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
      payload: e.response,
    });
  }
};
export const handleLevelChangeAction = (value) => async (dispatch) => {
  dispatch({
    type: actionType.LEVEL_CHANGE,
    payload: value,
  });
};
