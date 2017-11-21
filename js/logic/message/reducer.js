import { FETCH_MESSAGES } from './actions';
import { PROCESS_TEXT } from './actions';

export default function reducer(state = [], action) {
  switch (action.type) {
  case FETCH_MESSAGES:
    return action.payload;
  }
  return state;
}
