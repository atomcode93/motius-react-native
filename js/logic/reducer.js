import {combineReducers} from 'redux';
import userReducer from './user/reducer';
import messageReducer from './message/reducer';
import memberReducer from './member/reducer';
import selectionReducer from './selectedCard/reducer';
import authReducer from './login/reducer';
import facebookReducer from './facebook/reducer';
import instaReducer from './instagram/reducer';

import timerReducer from './timer/reducer';
import projectReducer from './project/reducer';
import milestoneReducer from './milestone/reducer';

export const reducer = combineReducers({
  facebook: facebookReducer,
  instagram: instaReducer,
  messages: messageReducer,
  members: memberReducer,
  selectedFileID: selectionReducer,
  auth: authReducer,
  timer: timerReducer,
  project: projectReducer,
  milestone: milestoneReducer,
});
