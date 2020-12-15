import { combineReducers } from 'redux';
import {loginReducer,createUserReducer,getAllUsersReducer} from './_user';


export default combineReducers({
  loginReducer,createUserReducer,getAllUsersReducer
}); 