import { authRef, provider } from '../config/firebase';
import * as types from './actionTypes';

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: types.FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: types.FETCH_USER,
        payload: null
      });
    }
  });
};

export const signIn = () => dispatch => {
  debugger;
  authRef
    .signInWithPopup(provider)
    .then(result => {
      dispatch({
        type: types.LOGIN_COMPLETE,
        payload: result.user
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  debugger;
  authRef
    .signOut()
    .then(() => {
      dispatch({
        type: types.LOGOUT_COMPLETE,
        payload: null
      });
    })
    .catch(error => {
      console.log(error);
    });
};
