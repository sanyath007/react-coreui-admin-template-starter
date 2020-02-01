import axios from 'axios';
import {
  FETCH_PATIENT_REQUEST,
  FETCH_PATIENT_SUCCESS,
  FETCH_PATIENT_FAILED,
  SET_PAGER,
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILED
} from './types';

const url = 'http://mnrhweb.com/api/imc';

export const fetchPatients = link => dispatch => {
  dispatch({ type: FETCH_PATIENT_REQUEST });
  let apiEnpoint = link || `${url}/patients`;

  axios.get(apiEnpoint)
    .then(res => {
      dispatch({ type: FETCH_PATIENT_SUCCESS, payload: res.data.pager.data });
      dispatch({ type: SET_PAGER, payload: res.data.pager });
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