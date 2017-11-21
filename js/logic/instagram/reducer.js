import { GET_INSUSERINFO, FETCH_INS_MEDIA } from './actions';

const INITIAL_STATE = {
  user: null,
  medias: []
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_INSUSERINFO:
    return { ...state, user: action.payload }
  case FETCH_INS_MEDIA:
    return { ...state, medias: action.payload }
  }
  return state;
}
