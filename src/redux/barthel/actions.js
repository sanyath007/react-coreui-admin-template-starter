import axios from 'axios';
import {
  FETCH_BARTHELS_REQUEST,
  FETCH_BARTHELS_SUCCESS,
  FETCH_BARTHELS_FAILED,
  ADD_BARTHELS_REQUEST,
  ADD_BARTHELS_SUCCESS,
  ADD_BARTHELS_FAILED,
  SET_BARTHELS_PAGER
} from './types';

export const fetchBarthels = link => dispatch => {
  let apiEnpoint = link || `/api/imc/barthels`;

  dispatch({ type: FETCH_BARTHELS_REQUEST });

  axios.get(apiEnpoint)
    .then(res => {      
      dispatch({ type: FETCH_BARTHELS_SUCCESS, payload: res.data.pager.data });
      dispatch({ type: SET_BARTHELS_PAGER, payload: res.data.pager });
      
    })
    .catch(err => {
      console.log(err.response);
    });
}

export const addBarthel = data => dispatch => {
  dispatch({ type: ADD_BARTHELS_REQUEST });
  
  axios.post('/api/imc/barthels', data)
    .then(res => {
      console.log(res.data);
      dispatch({ type: ADD_BARTHELS_SUCCESS, payload: res.data });
    }).then(() => {

    }).catch(err => {
      console.log(err.response);
      dispatch({ type: ADD_BARTHELS_FAILED });
    });
}
