import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Firebase, { FirebaseContext } from './components/Firebase';

import App from './components/App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import PasswordForgetPage from './components/PasswordForget';
import HomePage from './components/Home';
import AccountPage from './components/Account';
import AdminPage from './components/Admin';
import { CmsPage, ManageCmsPage, CmsListPage } from './components/CMS';
import { UserList, UserItem } from './components/Users';

import * as ROUTES from './constants/routes';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <BrowserRouter>
        <App>
          <Switch>
            {/* <Route exact path={ROUTES.LANDING} component={CmsPage} /> */}
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.ADMIN_CMS} component={CmsListPage} />
            <Route path={ROUTES.ADMIN_CMS_EDIT_PAGE} component={props => <ManageCmsPage {...props} />} />
            <Route exact path={ROUTES.ADMIN_USER_DETAILS} component={UserItem} />
            <Route exact path={ROUTES.ADMIN_USERS} component={UserList} />
            <Route component={props => <CmsPage {...props} />} />
          </Switch>
        </App>
      </BrowserRouter>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
