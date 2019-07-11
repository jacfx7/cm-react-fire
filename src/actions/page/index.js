import Firebase from '../../components/Firebase';
import * as TYPES from '../../constants/actions';

export const loadPages = () => dispatch => {
  const firebase = new Firebase();
  firebase.getPages().then(pages => {
    dispatch({
      type: TYPES.LOAD_PAGE_SUCCESS,
      pages: pages
    });
  });
};
