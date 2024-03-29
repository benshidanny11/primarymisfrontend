import axios from "axios";
import actionType from "./_actionTypes";
import jwt from "jsonwebtoken";
import cookie from "react-cookies";
import dotenv from "dotenv";

const getAllSubjectsAPI =
  "https://primaryims.herokuapp.com/api/subjects/all";
const getSubjectsByLevelAPI =
  "https://primaryims.herokuapp.com/api/subjects/levels";
  const getSubjectsByTeacherAPI =
  "https://primaryims.herokuapp.com/api/subjects/";
const createSubjectAPI = "https://primaryims.herokuapp.com/api/subjects/create";
const updateSubjectAPI = "https://primaryims.herokuapp.com/api/subjects/update";

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

export const updateSubjectAction = ({
  levelid,
  catmax,
  exammax,
  teacherid,
  subjectname,
  subjectNameToUpdate
  
}) => async (dispatch) => {
  dispatch({
    type: actionType.UPDATE_SUBJECT_LOADING_ACTION,
    payload: { type: "loading-update-subject" },
  });
  try {
    const { data } = await axios.put(
      `${updateSubjectAPI}/${subjectname}/${levelid}`,

      {
        catmax,
        exammax,
        teacherid,
        subjectname:subjectNameToUpdate,
        
    },
      {
        headers: {
          "Content-Type": "application/json",
          token: cookie.load("primary-mis-token"),
        },
      }
    );
    dispatch({
      type: actionType.UPDATE_SUBJECT_RESPONSE_ACTION,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: actionType.UPDATE_SUBJECT_ERROR_ACTION,
      payload: e.response,
    });
  }
};

export const getAllSubjectssAction = (levelid) => async (dispatch) => {
  const {userid,role} =cookie.load("user");
  
  const finalUrl = levelid
    ? getSubjectsByLevelAPI + "/" + levelid
    : getAllSubjectsAPI;
  dispatch({
    type: actionType.GET_ALL_SUBJECTS_LOADING_ACTION,
    payload: { type: "loading" },
  });
  try {
 
    axios
      .get((role!=="TEACHER")?finalUrl:getSubjectsByTeacherAPI+userid, {
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
