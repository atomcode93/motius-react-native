import { GET_FBUSERINFO, FETCH_FBPOSTS } from './actions';

const INITIAL_STATE = {
  user: null,
  posts: []
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_FBUSERINFO:
    return { ...state, user: action.payload };
  case FETCH_FBPOSTS:
    return { ...state, posts: action.payload };
  }
  return state;
}
