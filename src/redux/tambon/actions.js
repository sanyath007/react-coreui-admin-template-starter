import axios from 'axios';
import {
  FETCH_TAMBON_SUCCESS
} from './types';

const url = 'http://mnrhweb.com/api/imc';

export const fetchTambons = () => dispatch => {
  axios.get(`${url}/tambons`)
    .then(res => {
      dispatch({
        type: FETCH_TAMBON_SUCCESS,
        payload: res.data.tambons
      })
    })
    .catch(err => console.log(err));
}
