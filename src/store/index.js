import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/user.reducer';
import networkReducer from './reducers/network.reducer';

const store = createStore(
  combineReducers({ user: userReducer, network: networkReducer }),
  applyMiddleware(thunk)
);

export default store;
