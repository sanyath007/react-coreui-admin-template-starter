import axios from 'axios';
import {
  FETCH_AMPHUR_SUCCESS
} from './types';

const url = 'http://mnrhweb.com/api/imc';

export const fetchAmphurs = () => dispatch => {
  axios.get(`${url}/amphurs`)
    .then(res => {
      dispatch({
        type: FETCH_AMPHUR_SUCCESS,
        payload: res.data.amphurs
      })
    })
    .catch(err => console.log(err));
}

