import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import Firebase, { FirebaseContext } from '../Firebase';
import App from './index';
import * as ROUTES from '../../constants/routes';
import HomePage from '../Home';

describe('App Component::', () => {
  const initialState = {
    sessionState: {
      authUser: { roles: [] }
    }
  };
  const mockStore = configureStore(initialState);
  let store, wrapper;
  const children = <div>{}</div>;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <FirebaseContext.Provider value={new Firebase()}>
          <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <App children={children} />
          </MemoryRouter>
        </FirebaseContext.Provider>
      </Provider>
    );
  });

  it('renders without crashing', () => {
    expect(wrapper.find(App)).toHaveLength(1);
  });
});
