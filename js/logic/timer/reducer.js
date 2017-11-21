import {
  START_TIMER,
  STOP_TIMER,
  FETCH_TIMELOGS,
  RESET_TIMELOGS,
  LOG_TIMER,
  LOG_TIMER_SUCCESS,
  LOG_TIMER_FAIL
} from './actions';

const INITIAL_STATE = {
  startedTime: null,
  finishedTime: null,
  started: false,
  finished: false,
  error: '',
  loading: false,
  timeLogs: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case START_TIMER:
    return { ...state, started: true, paused: false, finished: false, startedTime: action.payload, finishedTime: '' };
  case STOP_TIMER:
    return { ...state, started: false, paused: false, finished: true, finishedTime: action.payload };
  case FETCH_TIMELOGS:
    return { ... state, timeLogs: action.payload }
  case RESET_TIMELOGS:
    return { ... state, timeLogs: [] }
  case LOG_TIMER:
    return { ...state, error: '', loading: true };
  case LOG_TIMER_SUCCESS:
    return { ...state, error: '', loading: false };
  case LOG_TIMER_FAIL:
    return { ...state, error: action.payload, loading: false };
  default:
    return state;
  }
};
