import axios from 'axios';

export const GET_INSUSERINFO = 'GET_INSUSERINFO';
export const FETCH_INS_MEDIA = 'FETCH_INS_MEDIA';

// TODO: Error handling
export function getINSUserInfo(url) {
  return function(dispatch, getState){
    const request = axios.get(url);
    request.then(response => {
      dispatch({
        type: GET_INSUSERINFO,
        payload: response.data.data
      });
    });
  };
}

export function fetchInsMedias(url) {
  return function(dispatch, getState){
    const request = axios.get(url);

    request.then(response => {
      dispatch({
        type: FETCH_INS_MEDIA,
        payload: response.data.data
      });
    });
  };
}
