import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/user.reducer';

const store = createStore(
  combineReducers({ user: userReducer }),
  applyMiddleware(thunk)
);

export default store;
