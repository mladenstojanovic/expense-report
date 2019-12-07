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
  IDLE
} from '../actions/network/network.constants';

const initialState = {
  networkStatus: IDLE,
  token: null,
  createUser: null,
  addConnection: null,
  job: null,
  getTransactions: null,
  transactionData: {}
};

const networkReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default networkReducer;
