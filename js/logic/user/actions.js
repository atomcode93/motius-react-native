// TODO: Is this still in use?
import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';
export function fetchUser(userID) {
  return function(dispatch, getState){
    // TODO: Do not hardcode tokens this way. At best create a constants.js file with all the values
    const token = '179940535380-179891467378-248996050244-98586c5720566924c174934ee1cee38f';
    const url = `https://slack.com/api/users.info?token=xoxp-${token}&user=${userID}&pretty=1`;
    const request = axios.get(url);

    request.then(response => {
      dispatch({
        type: FETCH_USER,
        payload: response.data.user
      });
    });
  };
}
