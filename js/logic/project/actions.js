import axios from 'axios';
import { PROJECT_LIST_API, INVITATION_LIST_API } from '../../common/Globals';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_INVITATIONS = 'FETCH_INVITATIONS';
export const SELECT_PROJECT = 'SELECT_PROJECT';
export const RESET_PROJECT = 'RESET_PROJECT';

export function fetchProjects(finished) {
  return async function(dispatch, getState){
    const {motiusUserToken} = getState().auth;
    try {
      const response = await axios.get(PROJECT_LIST_API, {headers: {'Authorization': `JWT ${motiusUserToken}`}});

      dispatch({
        type: FETCH_PROJECTS,
        payload: response.data.results
      });
    }catch(error){
      console.log(error);
    }finally {
      finished && finished();
    }
  };
}

export function fetchInvitations(finished) {
  return async function(dispatch, getState){
    const {motiusUserToken} = getState().auth;
    try {
      const response = await axios.get(INVITATION_LIST_API, {headers: {'Authorization': `JWT ${motiusUserToken}`}});
      dispatch({
        type: FETCH_INVITATIONS,
        payload: response.data
      });
    }catch(error){
      console.log(error);
    }finally {
      finished && finished();
    }
  };
}


export function selectProject(project) {
  return {
    type: SELECT_PROJECT,
    payload: project
  };
}

export function resetProject() {
  return {
    type: RESET_PROJECT
  };
}
