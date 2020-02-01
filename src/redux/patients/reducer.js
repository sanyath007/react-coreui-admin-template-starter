import {
  FETCH_PATIENT_REQUEST,
  FETCH_PATIENT_SUCCESS,
  FETCH_PATIENT_FAILED,
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILED
} from './types';

const initialState = {
  loading: false,
  patients: [],
  errors: ''
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
        loading: false,
        patients: action.payload,
        errors: ''
      };
    case FETCH_PATIENT_FAILED:
      return {
        loading: false,
        patients: [],
        errors: action.payload
      };
    case ADD_PATIENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_PATIENT_SUCCESS:
      return {
        loading: false,
        patients: [...state.patients, action.payload],
        errors: ''
      };
    case ADD_PATIENT_FAILED:
      return {
        loading: false,
        patients: [],
        errors: action.payload
      };
    default: return state;
  }
}
