import {
  FETCH_PROJECTS,
  FETCH_INVITATIONS,
  SELECT_PROJECT,
  RESET_PROJECT
} from './actions';

const INITIAL_STATE = {
  selectedProject: null,
  projects: [],
  invitations: []
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_PROJECTS:
    return {...state, projects: action.payload};
  case FETCH_INVITATIONS:
    return {...state, invitations: action.payload};
  case SELECT_PROJECT:
    return  {...state, selectedProject: action.payload};
  case RESET_PROJECT:
    return  {...state, selectedProject: null};
  }
  return state;
}
