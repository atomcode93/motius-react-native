import axios from 'axios';

export const FETCH_MILESTONE = 'FETCH_MILESTONE';
export const SELECT_TASK = 'SELECT_TASK';
export const RESET_TASK = 'RESET_TASK';

import {MILESTONES_API} from '../../common/Globals';


export function fetchMilestones(projectID, finished) {
  return async function(dispatch, getState){
    const {motiusUserToken} = getState().auth;
    const url = MILESTONES_API(projectID);
    try{
      const response = await axios.get(url, {headers: {Authorization: `JWT ${motiusUserToken}`}});
      dispatch({
        type: FETCH_MILESTONE,
        payload: response.data.results
      });
    }catch(error){
      console.log(error);
    }finally{
      finished && finished();
    }
  };
}

export function selectTask(task) {
  return {
    type: SELECT_TASK,
    payload: task
  };
}

export function resetTask() {
  return {
    type: RESET_TASK
  };
}
