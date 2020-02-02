import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
  AUTH_LOGOUT_SUCCESS,
  HIDE_ALERT
} from './types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case AUTH_LOGIN_SUCCESS:
      localStorage.setItem('token', JSON.stringify(payload));

      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isLoading: false
      };
    case AUTH_LOGIN_FAILED:
    case AUTH_LOGOUT_SUCCESS:
      localStorage.removeItem('token');

      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case HIDE_ALERT:
      return {
        ...state,
        errors: null,
        success: null,
      };
    default: return state;
  }
}
