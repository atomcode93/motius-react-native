import { SELECT_CARD } from './actions';

export default function reducer(state = [], action) {
  switch (action.type) {
  case SELECT_CARD:
    return action.payload;
  }
  return state;
}
