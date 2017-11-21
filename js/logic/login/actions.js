import axios from 'axios';
import { Actions } from 'react-native-router-flux';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SAVE_TOKEN = 'SAVE_TOKEN';
import {TOKEN_AUTH} from '../../common/Globals';

export const login = ({ username, password }, finished) => {
  return async function(dispatch){

    dispatch({
      type: LOGIN_USER
    });

    try{
      const response = await axios.post(TOKEN_AUTH, {
        username: username,
        password: password
      });
      dispatch({
        type: SAVE_TOKEN,
        payload: response.data.token,
      });
      Actions.home({type: 'replace'});
      dispatch(loginUserSuccess());

    }catch(e){
      let errorMessage = '';
      if(e.response){
        switch(e.response.status){
        case 400:
          errorMessage = 'Invalid credentials';
          break;
        default:
          errorMessage = `HTTP ${e.response.status} - ${e.response.data}`;
        }
      }
      else if(e.request){
        errorMessage = 'The server did not return a response. Check your network';
      }
      else{
        errorMessage = `Unknown error: ${e.message}`;
      }
      dispatch(loginUserFail(errorMessage));
    }
  };
};

const loginUserSuccess = () => ({
  type: LOGIN_USER_SUCCESS
});

const loginUserFail = (errorMessage) => ({
  type: LOGIN_USER_FAIL,
  payload: errorMessage,
});
