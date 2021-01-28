import { combineReducers } from "redux";
import {
  loginReducer,
  createUserReducer,
  getAllUsersReducer,
  updateUserReducer,
  deleteUSerReducer,
  getOneUserReducer
} from "./_user";
import {
  studentReducer,
  createStudentReducer,
  updateStudentReducer,
  deleteStudentReducer,
  getOneStudentReducer,
} from "./_students";
import {
  getAllSubjectsReducer,
  createSubjectReducer,
  updateSubjectReducer,
} from "./_subjects";
import { getAllTeachersReducer } from "./_teachers";
import {
  createPointReducer,
  getPointsReducer,
  updatePointReducer,
  getStudentReportDataInTermReducer,
  hideModalReducer,
  getMarksByStudentReducer,
  getStudentAnualReportDataReducer
} from "./_points";
import {
  disableSearchReducer,
  setFilterStudentDataReducer,
} from "./_globalReducers";

export default combineReducers({
  loginReducer,
  createUserReducer,
  getAllUsersReducer,
  studentReducer,
  createStudentReducer,
  updateStudentReducer,
  deleteStudentReducer,
  getAllSubjectsReducer,
  getAllTeachersReducer,
  createSubjectReducer,
  createPointReducer,
  getStudentAnualReportDataReducer,
  getPointsReducer,
  hideModalReducer,
  updatePointReducer,
  updateSubjectReducer,
  getStudentReportDataInTermReducer,
  disableSearchReducer,
  getOneStudentReducer,
  setFilterStudentDataReducer,
  getMarksByStudentReducer,
  updateUserReducer,
  deleteUSerReducer,
  getOneUserReducer
});
