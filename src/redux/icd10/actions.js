import axios from 'axios';
import {
  FETCH_ICD10S_REQUEST,
  FETCH_ICD10S_SUCCESS,
  FETCH_ICD10S_FAILED,
  SET_PAGER
} from './types';

export const fetchIcd10s = () => dispatch => {
  dispatch({ type: FETCH_ICD10S_REQUEST });
  
  axios.get('/api/imc/icd10s')
    .then(res => {
      console.log(res.data);
      
      dispatch({ type: FETCH_ICD10S_SUCCESS, payload: res.data.icd10s });
      // dispatch({ type: SET_PAGER, payload: res.data.pager });
      
    })
    .catch(err => {
      console.log(err.response);
    })
}