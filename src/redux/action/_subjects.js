import axios from "axios";
import actionType from "./_actionTypes";
import jwt from "jsonwebtoken";
import cookie from "react-cookies";
import dotenv from "dotenv";

const getAllSubjectsAPI =
  "https://primaryims.herokuapp.com/api/subjects/all";
const getSubjectsByLevelAPI =
  "https://primaryims.herokuapp.com/api/subjects/levels";
const createSubjectAPI = "https://primaryims.herokuapp.com/api/subjects/create";
const updateStudentAPI = "https://primaryims.herokuapp.com/api/student/update";
const getClassesAPI = "https://primaryims.herokuapp.com/api/class/classes/";
const deleteStudentAPI = "https://primaryims.herokuapp.com/api/student/delete";

dotenv.config();

export const createSubjectAction = (subjectData) => async (dispatch) => {
  dispatch({
    type: actionType.CREATE_STUDENT_LOADING_ACTION,
    payload: { type: "loading-create-teacher" },
  });
  try {
    const { data } = await axios.post(
      createSubjectAPI,

      {
        subjectname: subjectData.subjectName,
        catmax: subjectData.catMax,
        exammax: subjectData.examMax,
        levelid: subjectData.levelId,
        teacherid: subjectData.teacherId,
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

// export const updateStudentAction = (studentData) => async (dispatch) => {
//   dispatch({
//     type: actionType.UPDATE_STUDENT_LOADING_ACTION,
//     payload: { type: "loading-update" },
//   });
//   try {
//     const { data } = await axios.put(
//       `${updateStudentAPI}/${studentData.id}`,

//       {
//         studentnames: studentData.studentsNames,
//         parentsemail: studentData.parentsEmail,
//         parentsphonenumber: studentData.parentsPhone,
//         levelid: studentData.studentClass,
//         classid: studentData.studentLevel,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           token: cookie.load("primary-mis-token"),
//         },
//       }
//     );
//     dispatch({
//       type: actionType.UPDATE_STUDENT_RESPONSE_ACTION,
//       payload: data,
//     });
//   } catch (e) {
//     dispatch({
//       type: actionType.UPDATE_STUDENT_ERROR_ACTION,
//       payload: e.response,
//     });
//   }
// };

// export const deleteStudentAction = (id) => async (dispatch) => {
//   dispatch({
//     type: actionType.DELETE_STUDENT_LOADING_ACTION,
//     payload: { type: "loading-delete" },
//   });
//   try {
//     const { data } = await axios.delete(
//       `${deleteStudentAPI}/${id}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           token: cookie.load("primary-mis-token"),
//         },
//       }
//     );
//     dispatch({
//       type: actionType.DELETE_STUDENT_RESPONSE_ACTION,
//       payload: data,
//     });
//   } catch (e) {
//     dispatch({
//       type: actionType.DELETE_STUDENT_ERROR_ACTION,
//       payload: e.response,
//     });
//   }
// };

export const getAllSubjectssAction = (levelid) => async (dispatch) => {
  const finalUrl = levelid
    ? getSubjectsByLevelAPI + "/" + levelid
    : getAllSubjectsAPI;
  dispatch({
    type: actionType.GET_ALL_SUBJECTS_LOADING_ACTION,
    payload: { type: "loading" },
  });
  try {
 
    axios
      .get(finalUrl, {
        headers: {
          "Content-Type": "application/json",
          token: cookie.load("primary-mis-token"),
        },
      })
      .then((response) => {
        //  console.log(response)
        dispatch({
          type: actionType.GET_ALL_SUBJECTS_RESPONSE_ACTION,
          payload: response.data,
        });
      })
      .catch((e) => {
        dispatch({
          type: actionType.GET_ALL_SUBJECTS_ERROR_ACTION,
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

// export const getClassesAction = (levelid) => async (dispatch) => {
//   dispatch({
//     type: actionType.GET_ALL_CLASSES_LOADING_ACTION,
//     payload: { type: "loading" },
//   });
//   try {
//     const { data } = await axios.get(`${getClassesAPI}${levelid}`, {
//       headers: {
//         "Content-Type": "application/json",
//         token: cookie.load("primary-mis-token"),
//       },
//     });
//     dispatch({
//       type: actionType.GET_ALL_STUDENTS_RESPONSE_ACTION,
//       payload: data,
//     });
//   } catch (e) {
//     dispatch({
//       type: actionType.GET_ALL_STUDENTS_ERROR_ACTION,
//       payload: e.response,
//     });
//   }
// };
// export const handleLevelChangeAction = (value) => async (dispatch) => {
//   dispatch({
//     type: actionType.LEVEL_CHANGE,
//     payload: value,
//   });
// };
