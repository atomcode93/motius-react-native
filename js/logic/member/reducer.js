import { FETCH_MEMBERS } from './actions';

export default function reducer(state = [], action) {
  switch (action.type) {
  case FETCH_MEMBERS:
    return action.payload;
  }
  return state;
}
