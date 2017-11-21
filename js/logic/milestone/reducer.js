import {
  FETCH_MILESTONE,
  SELECT_TASK,
  RESET_TASK
  } from './actions';

const INITIAL_STATE = {
  selectedTask: null,
  milestones: []
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_MILESTONE:
    return {...state, milestones: action.payload};
  case SELECT_TASK:
    return  {...state, selectedTask: action.payload};
  case RESET_TASK:
    return  {...state, selectedTask: null};
  }
  return state;
}
