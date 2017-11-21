import { FETCH_USER } from './actions';

export default function reducer(state = [], action) {
  switch (action.type) {
  case FETCH_USER:
    return action.payload;
  }
  return state;
}
