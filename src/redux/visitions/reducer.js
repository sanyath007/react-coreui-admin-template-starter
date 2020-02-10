import {
  FETCH_VISITIONS_REQUEST,
  FETCH_VISITIONS_SUCCESS,
  FETCH_VISITIONS_FAILED,
  ADD_VISITION_REQUEST,
  ADD_VISITION_SUCCESS,
  ADD_VISITION_FAILED,
  UPDATE_VISITION_REQUEST,
  UPDATE_VISITION_SUCCESS,
  UPDATE_VISITION_FAILED,
  DELETE_VISITION_REQUEST,
  DELETE_VISITION_SUCCESS,
  DELETE_VISITION_FAILED,
  SET_VISITIONS_PAGER,
  HIDE_ALERT
} from './types';

const initialState = {
  loading: false,
  errors: null,
  success: null,
  visitions: [],
  visition: null,
  pager: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_VISITIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
        case FETCH_VISITIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        visitions: payload,
        errors: null
      };
    case FETCH_VISITIONS_FAILED:
      return {
        ...state,
        loading: false,
        visitions: [],
        errors: payload,
        success: null
      };
    case SET_VISITIONS_PAGER:
      return {
        ...state,
        pager: payload
      };
    case ADD_VISITION_SUCCESS:
      return {
        ...state,
        loading: false,
        visitions: [...state.visitions, payload],
        errors: null
      };




    case UPDATE_VISITION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_VISITION_SUCCESS:
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
    case UPDATE_VISITION_FAILED:
      return {
        ...state,
        loading: false,
        patients: [],
        errors: payload,
        success: null
      };
    case DELETE_VISITION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_VISITION_SUCCESS:
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
    case DELETE_VISITION_FAILED:
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
