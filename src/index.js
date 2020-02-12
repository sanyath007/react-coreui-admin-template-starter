import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import './index.css';
import 'react-toastify/dist/ReactToastify.min.css';
import App from './App';

import guardAuth from './utils/guardAuth';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';

console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
}

axios.interceptors.response.use(res => {
  console.log('on response is successfully...')  
  console.log(res);

  return res;
}, err => {
  console.log('on response is failure...')
  console.log(err)

  return Promise.reject(err);
});

guardAuth(localStorage.jwtToken, store);

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer autoClose={3000} />
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
