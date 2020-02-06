import axios from 'axios';
import {
  FETCH_VISITIONS_REQUEST,
  FETCH_VISITIONS_SUCCESS,
  FETCH_VISITIONS_FAILED,
  SET_VISITIONS_PAGER
} from './types';

export const fetchVisitions = link => dispatch => {
  let apiEnpoint = link || `/api/imc/visitions`;

  dispatch({ type: FETCH_VISITIONS_REQUEST });

  axios.get(apiEnpoint)
    .then(res => {
      console.log(res.data);
      
      dispatch({ type: FETCH_VISITIONS_SUCCESS, payload: res.data.pager.data });
      dispatch({ type: SET_VISITIONS_PAGER, payload: res.data.pager });
      
    })
    .catch(err => {
      console.log(err.response);
    })
  }