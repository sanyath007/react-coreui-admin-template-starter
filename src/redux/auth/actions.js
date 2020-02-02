import axios from 'axios';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
  AUTH_LOGOUT_SUCCESS,
  HIDE_ALERT
} from './types';

const url = 'http://mnrhweb.com/api/auth';

export const login = (credentials, history) => dispatch => {
  console.log('Login Action')
  dispatch({ type: AUTH_LOGIN_REQUEST });
  
  axios.post(`${url}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      dispatch({ type: AUTH_LOGIN_SUCCESS, payload: res.data });
    }).then(() => {
      history.push('/');
    }).catch(err => {
      dispatch({ 
        type: AUTH_LOGIN_FAILED,
        payload: {
          status: err.response.status,
          message: err.response.data.message
        }
      });
    });
}

export const logout = link => dispatch => {
  console.log('Logout Action')

  dispatch({ type: AUTH_LOGOUT_SUCCESS });

  // axios.get(`${url}/logout`)
  //   .then(res => {
  //     dispatch({ type: AUTH_LOGIN_SUCCESS, payload: res.data.pager.data });
  //   })
  //   .catch(err => {
  //     dispatch({ 
  //       type: AUTH_LOGIN_FAILED,
  //       payload: {
  //         status: err.response.status,
  //         message: err.response.data.message
  //       }
  //     });
  //   });
}

export const hideAlert = () => dispatch => {
  dispatch({ type: HIDE_ALERT })
}

export const tokenConfig = getState => {
  // Get token from localStorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }

  // If token, add to headers
  if(token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
}
