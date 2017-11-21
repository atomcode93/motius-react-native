import axios from 'axios';

export const FETCH_MESSAGES = 'FETCH_MESSAGES';

export function fetchMessages(url) {
  return async function(dispatch, getState){
    try{
      const response = await axios.get(url);
      dispatch({
        type: FETCH_MESSAGES,
        payload: response.data.messages
      });
    }catch(e){
      console.warn(e) 
    }
  };
}
