import * as TYPES from '../constants/actions';

const INITIAL_STATE = {
  page: null,
  pages: []
};

const applySetPages = (state, action) => ({
  ...state,
  pages: action.pages
});

const applySetPage = (state, action) => ({
  ...state,
  page: action.page
});

function pageReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.LOAD_PAGES_SUCCESS:
      return applySetPages(state, action);
    case TYPES.LOAD_PAGE_SUCCESS:
      debugger;
      return applySetPage(state, action);
    default:
      return state;
  }
}

export default pageReducer;
