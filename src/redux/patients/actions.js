import axios from 'axios';
import { isObject, isEmpty }  from 'lodash';
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

export const fetchPatients = link => dispatch => {
  let apiEnpoint = link || `/api/imc/patients`;

  console.log('fetch patients')
  dispatch({ type: FETCH_PATIENTS_REQUEST });

  axios.get(apiEnpoint)
    .then(res => {
      dispatch({ type: FETCH_PATIENTS_SUCCESS, payload: res.data.pager.data });
      dispatch({ type: SET_PATIENTS_PAGER, payload: res.data.pager });
    })
    .catch(err => {
      console.log(err.response);
      console.log(!isEmpty(err.response.data.message));
      dispatch({ 
        type: FETCH_PATIENTS_FAILED,
        payload: {
          status: err.response.status,
          message: getErrorMessage(err.response)
        }
      });
    });
}

function getErrorMessage(resData) {
  return isObject(resData.data) 
          ? !isEmpty(resData.data.message)
            ? resData.data.message
            : resData.statusText
          : !isEmpty(resData.data)
            ? resData.data
            : resData.statusText;
}

export const fetchPatient = id => dispatch => {
  dispatch({ type: FETCH_PATIENT_REQUEST });

  axios.get(`/api/imc/patients/${id}`)
    .then(res => {
      console.log(res.data.patient[0]);
      dispatch({ type: FETCH_PATIENT_SUCCESS, payload: res.data.patient[0] });
    })
    .catch(err => {
      dispatch({ 
        type: FETCH_PATIENT_FAILED,
        payload: {
          status: err.response.status,
          message: err.response.data.message
        }
      });
    });
}

export const addPatient = (patient) => dispatch => {
  dispatch({ type: ADD_PATIENT_REQUEST });

  axios.post(`/api/imc/patients`, patient, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    dispatch({
      type: ADD_PATIENT_SUCCESS,
      payload: res.data
    })
  }).then(() => {
    dispatch(fetchPatients());
  }).catch(err => {
    dispatch({ 
      type: ADD_PATIENT_FAILED,
      payload: {
        status: err.response.status,
        message: err.response.data.message
      }
    });
  });
}

export const updatePatient = (id, patient, history) => dispatch => {
  dispatch({ type: UPDATE_PATIENT_REQUEST });

  axios.put(`/api/imc/patients/${id}`, patient, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    dispatch({
      type: UPDATE_PATIENT_SUCCESS,
      payload: {
        id: id,
        patient: patient
      }
    })
  }).then(() => {
    history.push('/patients');
  }).catch(err => {
    dispatch({ 
      type: UPDATE_PATIENT_FAILED,
      payload: {
        status: err.response.status,
        message: err.response.data.message
      }
    });
  });
}

export const deletePatient = (id) => dispatch => {
  dispatch({ type: DELETE_PATIENT_REQUEST });

  console.log(id);
  axios.delete(`/api/imc/patients/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    dispatch({
      type: DELETE_PATIENT_SUCCESS,
      payload: res.data
    })
  }).then(() => {
      dispatch(fetchPatients());
  }).catch(err => {
    dispatch({ 
      type: DELETE_PATIENT_FAILED,
      payload: {
        status: err.response.status,
        message: err.response.data.message
      }
    });
  });
}

export const hideAlert = () => dispatch => {
  dispatch({ type: HIDE_ALERT })
}
