import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvarient from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore(initialStore) {
  /*  return createStore(
    rootReducer,
    initialStore,
    applyMiddleware(thunk, reduxImmutableStateInvarient())
  ); */

  return createStore(
    rootReducer,
    initialStore,
    composeWithDevTools(applyMiddleware(thunk, reduxImmutableStateInvarient()))
  );
}
