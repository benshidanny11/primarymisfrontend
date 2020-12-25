import { combineReducers } from "redux";
import { loginReducer, createUserReducer, getAllUsersReducer } from "./_user";
import {
  studentReducer,
  createStudentReducer,
  updateStudentReducer,
  deleteStudentReducer
} from "./_students";
import { getAllSubjectsReducer, createSubjectReducer} from "./_subjects";
import { getAllTeachersReducer } from "./_teachers";

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
  createSubjectReducer
});
