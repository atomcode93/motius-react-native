import axios from 'axios';

export const FETCH_MEMBERS = 'FETCH_MEMBERS';
export function fetchMembers(url) {
  return function(dispatch, getState){
    const request = axios.get(url);

    request.then(response => {
      dispatch({
        type: FETCH_MEMBERS,
        payload: response.data.members
      });
    });
  };
}
