import {
  GET_AUTH_TOKEN_START,
  IN_PROGRESS,
  CREATE_USER_START,
  SUCCESS,
  ADD_BANK_CONNECTION_START,
  GET_TRANSACTIONS_START,
  GET_AUTH_TOKEN_SUCCESS,
  CREATE_USER_SUCCESS,
  ADD_BANK_CONNECTION_SUCCESS,
  GET_TRANSACTIONS_SUCCESS,
  NETWORK_OPERATIONS_START,
  CONNECTION_JOB_START,
  CONNECTION_JOB_SUCCESS,
  IDLE,
  GET_AUTH_TOKEN_ERROR,
  ERROR,
  CREATE_USER_ERROR,
  ADD_BANK_CONNECTION_ERROR,
  CONNECTION_JOB_ERROR,
  GET_TRANSACTIONS_ERROR
} from '../actions/network/network.constants';

export const initialState = {
  networkStatus: IDLE,
  token: null,
  createUser: null,
  addConnection: null,
  job: null,
  getTransactions: null,
  transactionData: {}
};

export const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case NETWORK_OPERATIONS_START:
      return {
        ...state,
        networkStatus: IN_PROGRESS
      };
    case GET_AUTH_TOKEN_START:
      return {
        ...state,
        token: IN_PROGRESS
      };
    case GET_AUTH_TOKEN_SUCCESS:
      return {
        ...state,
        token: SUCCESS
      };
    case GET_AUTH_TOKEN_ERROR:
      return {
        ...state,
        token: ERROR
      };
    case CREATE_USER_START:
      return {
        ...state,
        createUser: IN_PROGRESS
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        createUser: SUCCESS
      };
    case CREATE_USER_ERROR:
      return {
        ...state,
        createUser: ERROR
      };
    case ADD_BANK_CONNECTION_START:
      return {
        ...state,
        addConnection: IN_PROGRESS
      };
    case ADD_BANK_CONNECTION_SUCCESS:
      return {
        ...state,
        addConnection: SUCCESS
      };
    case ADD_BANK_CONNECTION_ERROR:
      return {
        ...state,
        addConnection: ERROR
      };
    case CONNECTION_JOB_START:
      return {
        ...state,
        job: IN_PROGRESS
      };
    case CONNECTION_JOB_SUCCESS:
      return {
        ...state,
        job: SUCCESS
      };
    case CONNECTION_JOB_ERROR:
      return {
        ...state,
        job: ERROR
      };
    case GET_TRANSACTIONS_START:
      return {
        ...state,
        getTransactions: IN_PROGRESS
      };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        getTransactions: SUCCESS,
        networkStatus: SUCCESS,
        transactionData: action.payload
      };
    case GET_TRANSACTIONS_ERROR:
      return {
        ...state,
        getTransactions: ERROR
      };
    default:
      return state;
  }
};

export default networkReducer;
