import {
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_FAILED,
  SET_PATIENTS_PAGER,
  FETCH_PATIENT_REQUEST,
  FETCH_PATIENT_SUCCESS,
  FETCH_PATIENT_FAILED,
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILED,
  UPDATE_PATIENT_REQUEST,
  UPDATE_PATIENT_SUCCESS,
  UPDATE_PATIENT_FAILED,
  DELETE_PATIENT_REQUEST,
  DELETE_PATIENT_SUCCESS,
  DELETE_PATIENT_FAILED,
  HIDE_ALERT
} from './types';

const initialState = {
  loading: false,
  errors: null,
  success: null,
  patients: [],
  patient: null,
  pager: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PATIENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PATIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        patients: payload,
        errors: null
      };
    case FETCH_PATIENTS_FAILED:
      return {
        ...state,
        loading: false,
        patients: [],
        errors: payload,
        success: null
      };
    case SET_PATIENTS_PAGER:
      return {
        ...state,
        pager: payload
      };
    case FETCH_PATIENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        patient: payload,
        errors: null
      };
    case FETCH_PATIENT_FAILED:
      return {
        ...state,
        loading: false,
        patient: null,
        errors: payload,
        success: null
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
        patients: [...state.patients, payload],
        errors: null,
        success: {
          status: true,
          message: 'Added Successful !!'
        }
      };
    case ADD_PATIENT_FAILED:
      return {
        ...state,
        loading: false,
        patients: [],
        errors: payload.errors,
        success: null
      };
    case UPDATE_PATIENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PATIENT_SUCCESS:
      let updatedPatient = state.patients.map(patient => {
        if(patient.id === payload.id) {
          return payload.patient;
        } else {
          return patient;
        }
      });

      return {
        ...state,
        loading: false,
        patients: updatedPatient,
        errors: null,
        success: {
          status: true,
          message: 'Updated Successful !!'
        }
      };
    case UPDATE_PATIENT_FAILED:
      return {
        ...state,
        loading: false,
        patients: [],
        errors: payload,
        success: null
      };
    case DELETE_PATIENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        patients: [...state.patients, payload],
        errors: null,
        success: {
          status: true,
          message: 'Deleted Successful !!'
        }
      };
    case DELETE_PATIENT_FAILED:
      return {
        ...state,
        loading: false,
        patients: [],
        errors: payload,
        success: null
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
