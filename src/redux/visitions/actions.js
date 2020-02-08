import axios from 'axios';
import {
  FETCH_VISITIONS_REQUEST,
  FETCH_VISITIONS_SUCCESS,
  FETCH_VISITIONS_FAILED,
  ADD_VISITIONS_REQUEST,
  ADD_VISITIONS_SUCCESS,
  ADD_VISITIONS_FAILED,
  SET_VISITIONS_PAGER
} from './types';

export const fetchVisitions = link => dispatch => {
  let apiEnpoint = link || `/api/imc/visitions`;

  dispatch({ type: FETCH_VISITIONS_REQUEST });

  axios.get(apiEnpoint)
    .then(res => {      
      dispatch({ type: FETCH_VISITIONS_SUCCESS, payload: res.data.pager.data });
      dispatch({ type: SET_VISITIONS_PAGER, payload: res.data.pager });
      
    })
    .catch(err => {
      console.log(err.response);
    });
}

export const addVisition = data => dispatch => {
  dispatch({ type: ADD_VISITIONS_REQUEST });

  const formData = new FormData();

  Object.keys(data).map(key => {
    formData.append(key, data[key]);
  })

  data.attachments.forEach(file => {
    formData.append('attachments[]', file, file.name);
  });
  
  axios.post('/api/imc/visitions', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
      dispatch({ type: ADD_VISITIONS_SUCCESS, payload: res.data });
    }).then(() => {

    }).catch(err => {
      console.log(err.response);
      dispatch({ type: ADD_VISITIONS_FAILED });
    });
}

export const addBarthel = data => dispatch => {
  dispatch({ type: ADD_VISITIONS_REQUEST });
  
  axios.post('/api/imc/visitions', data)
    .then(res => {
      dispatch({ type: ADD_VISITIONS_SUCCESS, payload: res.data });
    }).then(() => {

    }).catch(err => {
      console.log(err.response);
      dispatch({ type: ADD_VISITIONS_FAILED });
    });
}
