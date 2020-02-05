import {
  FETCH_REGISTRATIONS_REQUEST,
  FETCH_REGISTRATIONS_SUCCESS,
  FETCH_REGISTRATIONS_FAILED,
  SET_PAGER
} from './types';

const initialState = {
  loading: false,
  errors: null,
  success: null,
  registrations: [],
  registration: null,
  pager: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_REGISTRATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_REGISTRATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        registrations: payload,
        errors: null
      };
    case FETCH_REGISTRATIONS_FAILED:
      return {
        ...state,
        loading: false,
        registrations: [],
        errors: payload,
        success: null
      };
    case SET_PAGER:
      return {
        ...state,
        pager: payload
      };
    default: return state;
  }
}
  