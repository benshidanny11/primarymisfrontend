import axios from "axios";
import actionType from "./_actionTypes";
import jwt from "jsonwebtoken";
import cookie from "react-cookies";
import dotenv from "dotenv";

const getAllClassesAPI =
  "https://primaryims.herokuapp.com/api/class/classes";

dotenv.config();

// export const createSubjectAction = (subjectData) => async (dispatch) => {
//   dispatch({
//     type: actionType.CREATE_STUDENT_LOADING_ACTION,
//     payload: { type: "loading-create-teacher" },
//   });
//   try {
//     const { data } = await axios.post(
//       createSubjectAPI,

//       {
//         subjectname: subjectData.subjectName,
//         catmax: subjectData.catMax,
//         exammax: subjectData.examMax,
//         levelid: subjectData.levelId,
//         teacherid: subjectData.teacherId,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           token: cookie.load("primary-mis-token"),
//         },
//       }
//     );
//     dispatch({
//       type: actionType.CREATE_STUDENT_RESPONSE_ACTION,
//       payload: data,
//     });
//   } catch (e) {
//     dispatch({
//       type: actionType.CREATE_STUDENT_ERROR_ACTION,
//       payload: e.response,
//     });
//   }
// };

// export const updateSubjectAction = ({
//   levelid,
//   catmax,
//   exammax,
//   teacherid,
//   subjectname,
//   subjectNameToUpdate
  
// }) => async (dispatch) => {
//   dispatch({
//     type: actionType.UPDATE_SUBJECT_LOADING_ACTION,
//     payload: { type: "loading-update-subject" },
//   });
//   try {
//     const { data } = await axios.put(
//       `${updateSubjectAPI}/${subjectname}/${levelid}`,

//       {
//         catmax,
//         exammax,
//         teacherid,
//         subjectname:subjectNameToUpdate,
        
//     },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           token: cookie.load("primary-mis-token"),
//         },
//       }
//     );
//     dispatch({
//       type: actionType.UPDATE_SUBJECT_RESPONSE_ACTION,
//       payload: data,
//     });
//   } catch (e) {
//     dispatch({
//       type: actionType.UPDATE_SUBJECT_ERROR_ACTION,
//       payload: e.response,
//     });
//   }
// };

export const getAllClassessAction = (levelid) => async (dispatch) => {
  const {userid,role} =cookie.load("user");
  
  const finalUrl = levelid
    ? getAllClassesAPI + "/" + levelid
    : getAllClassesAPI;
  dispatch({
    type: actionType.GET_ALL_CLASSES_LOADING_ACTION,
    payload: { type: "loading" },
  });
  try {
 
    axios
      .get((role!=="TEACHER")?finalUrl:'', {
        headers: {
          "Content-Type": "application/json",
          token: cookie.load("primary-mis-token"),
        },
      })
      .then((response) => {
        //  console.log(response)
        dispatch({
          type: actionType.GET_ALL_CLASSES_RESPONSE_ACTION,
          payload: response.data,
        });
      })
      .catch((e) => {
        dispatch({
          type: actionType.GET_ALL_CLASS_IN_LEVEL_ERROR_ACTION,
          payload: e.response,
        });
      });
  } catch (e) {
    dispatch({
      type: actionType.GET_ALL_CLASSES_ERROR_ACTION,
      payload: e.response.data,
    });
  }
};
