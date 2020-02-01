import axios from 'axios';
import {
  FETCH_PATIENT_REQUEST,
  FETCH_PATIENT_SUCCESS,
  FETCH_PATIENT_FAILED,
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILED
} from './types';

const url = 'http://mnrhweb.com/api/imc';

export const fetchPatients = () => dispatch => {
  dispatch({ type: FETCH_PATIENT_REQUEST });

  axios.get(`${url}/patients`)
    .then(res => {
      dispatch({ type: FETCH_PATIENT_SUCCESS, payload: res.data.pager.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_PATIENT_FAILED, payload: err.response.data })
    });
}

export const addPatient = (patient) => dispatch => {
  dispatch({ type: ADD_PATIENT_REQUEST });

  axios.post(`${url}/patients`, patient, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    dispatch({
      type: ADD_PATIENT_SUCCESS,
      payload: res.data
    })
  }).catch(err => {
    dispatch({ type: ADD_PATIENT_FAILED, payload: err.response.data })
  });
}