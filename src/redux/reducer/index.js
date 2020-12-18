import { combineReducers } from 'redux';
import {loginReducer,createUserReducer,getAllUsersReducer} from './_user';
import {studentReducer} from './_students';


export default combineReducers({
  loginReducer,createUserReducer,getAllUsersReducer,studentReducer
}); 