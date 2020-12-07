import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducer';

const { NODE_ENV } = process.env;
const middleware = [thunk];
const initailState = {};

const enableDevTools = NODE_ENV === 'development' 
? composeWithDevTools(applyMiddleware(...middleware))
:applyMiddleware(...middleware);

const store = createStore(rootReducer, initailState, enableDevTools)

export default store;