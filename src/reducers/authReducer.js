import * as types from '../actions/actionTypes';

export default (state = false, action) => {
  switch (action.type) {
    case types.FETCH_USER:
      return action.payload || null;
    case types.LOGOUT_COMPLETE:
      return { ...state, auth: null };
    default:
      return state;
  }
};
