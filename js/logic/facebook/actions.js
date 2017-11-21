import axios from 'axios';

export const GET_FBUSERINFO = 'GET_FBUSERINFO';
export const FETCH_FBPOSTS = 'FETCH_FBPOSTS';

export function getFBUserInfo(url) {
  return async function(dispatch, getState){
    try{
      const response = await axios.get(url);
      dispatch({
        type: GET_FBUSERINFO,
        payload: response.data
      });
    }catch(e){
      console.warn(e)
      if(e.response){
        console.warn(e.response.data)
        /* I'm getting this error:
        { 
          code: 190,
          error_data:{"checkpoint_flow_id":"1501092823525282","checkpoint_content_id":"0"},
          error_subcode:490,
          fbtrace_id: "AKERFEK61iI",
          message: "Error validating access token: The user is enrolled in a blocking, logged-in checkpoint",
          type: "OAuthException"
        }
        */
      }
    }
  };
}

export function fetchFBPosts(url) {
    return async function(dispatch, getState){
    try{
      const response = await axios.get(url);
      dispatch({
        type: FETCH_FBPOSTS,
        payload: response.data
      });
    }catch(e){
      console.warn(e);
      if(e.response){
        console.warn(e.response.data);
        /* I'm getting the following error*/
        /*error = {code: 190,
          error_data:"{"checkpoint_flow_id":"1501092823525282","checkpoint_content_id":"0"}",
          error_subcode: 490,
          fbtrace_id: "CGHMYdB7bu+",
          message: "Error validating access token: The user is enrolled in a blocking, logged-in checkpoint",
          type: "OAuthException"}*/
      }
    }
  };
}
