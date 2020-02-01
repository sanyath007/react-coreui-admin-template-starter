import {
  FETCH_PATIENT_REQUEST,
  FETCH_PATIENT_SUCCESS,
  FETCH_PATIENT_FAILED,
  SET_PAGER,
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILED
} from './types';

const initialState = {
  loading: false,
  errors: '',
  success: null,
  patients: [],
  pager: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PATIENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        patients: action.payload,
        errors: ''
      };
    case FETCH_PATIENT_FAILED:
      return {
        ...state,
        loading: false,
        patients: [],
        errors: action.payload,
        success: {},
      };
    case SET_PAGER:
      return {
        ...state,
        pager: action.payload
      };
    case ADD_PATIENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        patients: [...state.patients, action.payload],
        errors: '',
        success: {
          status: true,
          message: 'Successful !!'
        }
      };
    case ADD_PATIENT_FAILED:
      return {
        ...state,
        loading: false,
        patients: [],
        errors: action.payload,
        success: {},
      };
    default: return state;
  }
}
