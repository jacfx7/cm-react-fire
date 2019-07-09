import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import userReducer from './userReducer';
import messageReducer from './messageReducer';
import pageReducer from './pageReducer';

export default combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  messageState: messageReducer,
  pageState: pageReducer
});
