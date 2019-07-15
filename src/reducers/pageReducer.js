import * as TYPES from '../constants/actions';

const INITIAL_STATE = {
  page: null,
  pages: [],
  lastLocation: null,
  error: null
};

const applySetPages = (state, action) => ({
  ...state,
  pages: action.pages
});

const applySetPage = (state, action) => ({
  ...state,
  page: action.page
});

const applyClearPage = (state, action) => ({
  ...state,
  page: null,
  lastLocation: action.location
});

const applyPageSaved = (state, action) => ({
  ...state,
  page: action.page
});

const applyPageError = (state, action) => ({
  ...state,
  error: action.error
});

function pageReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.LOAD_PAGES_SUCCESS:
      return applySetPages(state, action);
    case TYPES.LOAD_PAGE_SUCCESS:
      return applySetPage(state, action);
    case TYPES.CLEAR_PAGE_SUCCESS:
      return applyClearPage(state, action);
    case TYPES.PAGE_SAVE_SUCCESS:
      return applyPageSaved(state, action);
    case TYPES.PAGE_SAVE_FAILURE:
      return applyPageError(state, action);
    default:
      return state;
  }
}

export default pageReducer;
