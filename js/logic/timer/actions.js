import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {TIMELOGS_API} from '../../common/Globals';
export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const FETCH_TIMELOGS = 'FETCH_TIMELOGS';
export const RESET_TIMELOGS = 'RESET_TIMELOGS';
export const LOG_TIMER = 'LOG_TIMER';
export const LOG_TIMER_SUCCESS = 'LOG_TIMER_SUCCESS';
export const LOG_TIMER_FAIL = 'LOG_TIMER_FAIL';

export const startTimerAt = (time) => {
  return {
    type: START_TIMER,
    payload: time
  };
};

export const stopTimerAt = (time) => {
  return {
    type: STOP_TIMER,
    payload: time
  };
};

export const fetchTimeLogs = (projectID, finished) => {
  return async function(dispatch, getState) {
    const {motiusUserToken} = getState().auth;
    const url = TIMELOGS_API(projectID);
    try{
      const response = await axios.get(url, {headers: {Authorization: `JWT ${motiusUserToken}`}});
      dispatch({
        type: FETCH_TIMELOGS,
        payload: response.data.results
      });
    }catch(error){
      console.log(error);
    }finally{
      finished && finished();
    };
  };
};

export const resetTimeLogs = () => {
  return {
    type: RESET_TIMELOGS
  };
}

export const logTimer = (projectID, startTime, endTime, pausedMinutes, taskID, description) => {
  return async function(dispatch, getState){
    const {motiusUserToken} = getState().auth;
    dispatch({
      type: LOG_TIMER
    });
    try{
      const response = await axios.post(TIMELOGS_API(projectID), {
        start_time: startTime,
        end_time: endTime,
        paused_minutes: pausedMinutes,
        comment: description,
        task: taskID
      }, {
        headers: {'Authorization': `JWT ${motiusUserToken}`}
      });
      console.log(response.data);
      logTimerSuccess(dispatch);
    }catch(error){
      console.log(error),logTimerFail(dispatch);
    }
  };
};

const logTimerSuccess = (dispatch) => {
  dispatch({
    type: LOG_TIMER_SUCCESS
  });
  Actions.pop();
};

const logTimerFail = (dispatch) => {
  dispatch({
    type: LOG_TIMER_FAIL
  });
};
