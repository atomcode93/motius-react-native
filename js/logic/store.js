/**
 * Configures the redux store to work with middleware and enhancers
 * @flow
 */
'use strict';
import {AsyncStorage} from 'react-native';
import {createStore, applyMiddleware, compose} from 'redux';
import devTools, { composeWithDevTools } from 'remote-redux-devtools';
import {persistStore, autoRehydrate} from 'redux-persist';
import thunk from 'redux-thunk';

import {reducer} from '../logic/reducer';
/**
 * Configures the redux store to work with the application reducers and several middleware layers.
 * The function both returns and issues a callback, since that is also the behaviour of the persistStore function.
 * Returns both the store object that provides access to the redux data and the persistor that handles data persistence.
 * @param onComplete Will be called upon completion of all tasks
 * @return {{store: object, persistor: object}}
 */
const USE_DEVTOOLS = true;

export function configureStore(onComplete){
  let enhancer;
  if(__DEV__ && USE_DEVTOOLS){
    enhancer = compose(autoRehydrate(), applyMiddleware(thunk), devTools()); /* DevTools only works if Remote JS Debugging is enabled. If that is not the case, simply take it away in order to remove the multiple warnings*/
  }else{
    enhancer = compose(autoRehydrate(), applyMiddleware(thunk));
  }
  const store = createStore(reducer, {}, enhancer);
  const persistor = persistStore(store, {
    storage: AsyncStorage,
    blacklist: ['device', 'routes', 'status', 'synchronizer']},
    onComplete);
  return {store, persistor};
}
