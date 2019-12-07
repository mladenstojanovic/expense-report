import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import networkReducer from './reducers/network.reducer';

const store = createStore(
  combineReducers({ network: networkReducer }),
  applyMiddleware(thunk)
);

export default store;
