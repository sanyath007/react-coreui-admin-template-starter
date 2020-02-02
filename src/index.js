import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import jwt from 'jsonwebtoken';

import store from './redux/store';
import { setCurrentUser } from './redux/auth';
import setAuthorization from './utils/setAuthorizationToken';

import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

if(localStorage.jwtToken) {
  console.log('jwtToken is available');
  const token = JSON.parse(localStorage.jwtToken);
  
  setAuthorization(token.access_token);
  store.dispatch(setCurrentUser(token.user));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
