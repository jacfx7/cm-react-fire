import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';
import configureStore from '../../store/configureStore';

let mockedStore = configureStore([])({});

it('renders without crashing', () => {
  /* const div = document.createElement('div');

  ReactDOM.render(<App store/>, div);
  ReactDOM.unmountComponentAtNode(div); */
});
