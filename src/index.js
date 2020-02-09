import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import store from './redux/store';
import { setCurrentUser, logout } from './redux/auth';
import setAuthorization from './utils/setAuthorizationToken';

import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

console.log(process.env.NODE_ENV);

// if(process.env.NODE_ENV === 'development') {
//   axios.defaults.baseURL = 'http://mnrhweb.com'
// }

if(process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://smkorat.com/mnrhweb/public'
}

if(localStorage.jwtToken) {
  console.log('jwtToken is available');
  const { access_token: token, user } = JSON.parse(localStorage.jwtToken);

  /** Option 1 comparing token.exp by Date.now */
  // const decodedToken = jwt.decode(token);
  // console.log(`${Date.now()} == ${decodedToken.exp}`);
  
  /** Option 1 Use jwt verify function */
  jwt.verify(token, 'puU29GeajPSk7ouhRi0fPMijbQzww5x6QUEMWRK1QVdWx6nmPKRsBi9unBXhmdoF', (err, decoded) => {
    console.log(`err: ${err}`);
    console.log(decoded);

    if (err) {     
      store.dispatch(logout()); 
      /** Set error message if token invalid */
      // err = {
      //   name: 'TokenExpiredError',
      //   message: 'jwt expired',
      //   expiredAt: decoded.exp
      // }
    } else {
      setAuthorization(token);
      store.dispatch(setCurrentUser(user));
    }
  });
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
