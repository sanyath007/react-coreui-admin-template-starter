import axios from 'axios';
import {
  FETCH_CHANGWAT_SUCCESS
} from './types';

const url = 'http://mnrhweb.com/api/imc';

export const fetchChangwats = () => dispatch => {
  axios.get(`${url}/changwats`)
    .then(res => {
      dispatch({
        type: FETCH_CHANGWAT_SUCCESS,
        payload: res.data.changwats
      })
    })
    .catch(err => console.log(err));
}
