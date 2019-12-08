import networkReducer, { initialState } from './network.reducer';
import {
  NETWORK_OPERATIONS_START,
  IN_PROGRESS,
  GET_AUTH_TOKEN_START,
  GET_AUTH_TOKEN_SUCCESS,
  SUCCESS,
  GET_TRANSACTIONS_ERROR,
  ERROR,
  CREATE_USER_START,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  ADD_BANK_CONNECTION_START,
  ADD_BANK_CONNECTION_SUCCESS,
  ADD_BANK_CONNECTION_ERROR,
  CONNECTION_JOB_START,
  CONNECTION_JOB_SUCCESS,
  CONNECTION_JOB_ERROR,
  GET_TRANSACTIONS_START,
  GET_TRANSACTIONS_SUCCESS,
  GET_AUTH_TOKEN_ERROR
} from '../actions/network/network.constants';

describe('Test network reducer', () => {
  it('should return initial state if called bad action type', () => {
    expect(networkReducer(initialState, { type: 'test' })).toEqual(
      initialState
    );
  });
  it('should set networkStatus to in progress when network operations start', () => {
    expect(
      networkReducer(initialState, { type: NETWORK_OPERATIONS_START })
    ).toEqual({ ...initialState, networkStatus: IN_PROGRESS });
  });
  it('should set token to in progress when get auth token starts', () => {
    expect(
      networkReducer(initialState, { type: GET_AUTH_TOKEN_START })
    ).toEqual({ ...initialState, token: IN_PROGRESS });
  });
  it('should set token to success when get auth token finishes', () => {
    expect(
      networkReducer(initialState, { type: GET_AUTH_TOKEN_SUCCESS })
    ).toEqual({ ...initialState, token: SUCCESS });
  });
  it('should set token to error when get auth token throws an error', () => {
    expect(
      networkReducer(initialState, { type: GET_AUTH_TOKEN_ERROR })
    ).toEqual({ ...initialState, token: ERROR });
  });
  it('should set createUser to in progress when create user starts', () => {
    expect(networkReducer(initialState, { type: CREATE_USER_START })).toEqual({
      ...initialState,
      createUser: IN_PROGRESS
    });
  });
  it('should set createUser to success when create user finishes', () => {
    expect(
      networkReducer(initialState, { type: CREATE_USER_SUCCESS })
    ).toEqual({ ...initialState, createUser: SUCCESS });
  });
  it('should set createUser to error when create user throws an error', () => {
    expect(networkReducer(initialState, { type: CREATE_USER_ERROR })).toEqual({
      ...initialState,
      createUser: ERROR
    });
  });
  it('should set addConnection to in progress when bank connection starts', () => {
    expect(
      networkReducer(initialState, { type: ADD_BANK_CONNECTION_START })
    ).toEqual({ ...initialState, addConnection: IN_PROGRESS });
  });
  it('should set addConnection to success when bank connection finishes', () => {
    expect(
      networkReducer(initialState, { type: ADD_BANK_CONNECTION_SUCCESS })
    ).toEqual({ ...initialState, addConnection: SUCCESS });
  });
  it('should set addConnection to error when bank connection throws an error', () => {
    expect(
      networkReducer(initialState, { type: ADD_BANK_CONNECTION_ERROR })
    ).toEqual({ ...initialState, addConnection: ERROR });
  });
  it('should set job to in progress when job starts', () => {
    expect(
      networkReducer(initialState, { type: CONNECTION_JOB_START })
    ).toEqual({ ...initialState, job: IN_PROGRESS });
  });
  it('should set job to success when job finishes', () => {
    expect(
      networkReducer(initialState, { type: CONNECTION_JOB_SUCCESS })
    ).toEqual({ ...initialState, job: SUCCESS });
  });
  it('should set job to error when job throws an error', () => {
    expect(
      networkReducer(initialState, { type: CONNECTION_JOB_ERROR })
    ).toEqual({ ...initialState, job: ERROR });
  });
  it('should set getTransactions to in progress when get transactions starts', () => {
    expect(
      networkReducer(initialState, { type: GET_TRANSACTIONS_START })
    ).toEqual({ ...initialState, getTransactions: IN_PROGRESS });
  });
  it('should set getTransactions to success when get transactions finishes', () => {
    expect(
      networkReducer(initialState, {
        type: GET_TRANSACTIONS_SUCCESS,
        payload: 'test payload'
      })
    ).toEqual({
      ...initialState,
      getTransactions: SUCCESS,
      networkStatus: SUCCESS,
      transactionData: 'test payload'
    });
  });
  it('should set getTransactions to error when get transactions throws an error', () => {
    expect(
      networkReducer(initialState, { type: GET_TRANSACTIONS_ERROR })
    ).toEqual({ ...initialState, getTransactions: ERROR });
  });
});
