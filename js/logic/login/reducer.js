import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  SAVE_TOKEN,
} from './actions';

const INITIAL_STATE = {
  error: '',
  loading: false,
  motiusUserToken: null,
};

export default (state = INITIAL_STATE , action) => {
  switch (action.type) {
  case LOGIN_USER:
    return { ...state, error: '', loading: true };
  case LOGIN_USER_SUCCESS:
    return { ...state, error: '', loading: false };
  case LOGIN_USER_FAIL:
    return { ...state, error: 'Authentication Failed.', succesful: false, loading: false, password: ''};
  case LOGOUT_USER:
    return { ...state, error: action.payload, loading: false, password: ''};
  case SAVE_TOKEN:
    return {...state, motiusUserToken: action.payload};
  }
  return state;
};
