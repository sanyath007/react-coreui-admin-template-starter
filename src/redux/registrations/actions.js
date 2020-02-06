import axios from 'axios';
import {
  FETCH_REGISTRATIONS_REQUEST,
  FETCH_REGISTRATIONS_SUCCESS,
  FETCH_REGISTRATIONS_FAILED,
  SET_REGISTRATIONS_PAGER
} from './types';

export const fetchRegistrations = link => dispatch => {
  let apiEnpoint = link || `/api/imc/registrations`;

  dispatch({ type: FETCH_REGISTRATIONS_REQUEST });
  
  axios.get(apiEnpoint)
    .then(res => {
      console.log(res.data);
      
      dispatch({ type: FETCH_REGISTRATIONS_SUCCESS, payload: res.data.pager.data });
      dispatch({ type: SET_REGISTRATIONS_PAGER, payload: res.data.pager });
      
    })
    .catch(err => {
      console.log(err.response);
    })
}
  
export const addRegistration = (data) => dispatch => {
  console.log(data);    
}