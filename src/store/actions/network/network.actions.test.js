import {
  getAuthTokenStart,
  getAuthTokenSuccess,
  getAuthTokenError,
  createUserStart,
  createUserSuccess,
  createUserError,
  addBankConnectionStart,
  addBankConnectionSuccess,
  addBankConnectionError,
  connectionJobStart,
  connectionJobSuccess,
  connectionJobError,
  getTransactionsStart,
  getTransactionsSuccess,
  getTransactionsError,
  networkOperationsStart
} from './network.actions';
import {
  GET_AUTH_TOKEN_START,
  CREATE_USER_START,
  ADD_BANK_CONNECTION_START,
  GET_TRANSACTIONS_START,
  GET_AUTH_TOKEN_SUCCESS,
  CREATE_USER_SUCCESS,
  ADD_BANK_CONNECTION_SUCCESS,
  GET_TRANSACTIONS_SUCCESS,
  NETWORK_OPERATIONS_START,
  CONNECTION_JOB_START,
  CONNECTION_JOB_SUCCESS,
  GET_AUTH_TOKEN_ERROR,
  CREATE_USER_ERROR,
  ADD_BANK_CONNECTION_ERROR,
  CONNECTION_JOB_ERROR,
  GET_TRANSACTIONS_ERROR
} from './network.constants';

describe('Test network actions', () => {
  it('should return correct type when getAuthTokenStart is called', () => {
    expect(getAuthTokenStart()).toEqual({ type: GET_AUTH_TOKEN_START });
  });
  it('should return correct type when getAuthTokenSuccess is called', () => {
    expect(getAuthTokenSuccess()).toEqual({ type: GET_AUTH_TOKEN_SUCCESS });
  });
  it('should return correct type when getAuthTokenError is called', () => {
    expect(getAuthTokenError()).toEqual({ type: GET_AUTH_TOKEN_ERROR });
  });
  it('should return correct type when createUserStart is called', () => {
    expect(createUserStart()).toEqual({ type: CREATE_USER_START });
  });
  it('should return correct type when createUserSuccess is called', () => {
    expect(createUserSuccess()).toEqual({ type: CREATE_USER_SUCCESS });
  });
  it('should return correct type when createUserError is called', () => {
    expect(createUserError()).toEqual({ type: CREATE_USER_ERROR });
  });
  it('should return correct type when addBankConnectionStart is called', () => {
    expect(addBankConnectionStart()).toEqual({
      type: ADD_BANK_CONNECTION_START
    });
  });
  it('should return correct type when addBankConnectionSuccess is called', () => {
    expect(addBankConnectionSuccess()).toEqual({
      type: ADD_BANK_CONNECTION_SUCCESS
    });
  });
  it('should return correct type when addBankConnectionError is called', () => {
    expect(addBankConnectionError()).toEqual({
      type: ADD_BANK_CONNECTION_ERROR
    });
  });
  it('should return correct type when connectionJobStart is called', () => {
    expect(connectionJobStart()).toEqual({
      type: CONNECTION_JOB_START
    });
  });
  it('should return correct type when connectionJobSuccess is called', () => {
    expect(connectionJobSuccess()).toEqual({
      type: CONNECTION_JOB_SUCCESS
    });
  });
  it('should return correct type when connectionJobError is called', () => {
    expect(connectionJobError()).toEqual({
      type: CONNECTION_JOB_ERROR
    });
  });
  it('should return correct type when getTransactionsStart is called', () => {
    expect(getTransactionsStart()).toEqual({
      type: GET_TRANSACTIONS_START
    });
  });
  it('should return correct type when getTransactionsSuccess is called', () => {
    expect(getTransactionsSuccess('payload')).toEqual({
      type: GET_TRANSACTIONS_SUCCESS,
      payload: 'payload'
    });
  });
  it('should return correct type when getTransactionsError is called', () => {
    expect(getTransactionsError()).toEqual({
      type: GET_TRANSACTIONS_ERROR
    });
  });
  it('should return correct type when networkOperationsStart is called', () => {
    expect(networkOperationsStart()).toEqual({
      type: NETWORK_OPERATIONS_START
    });
  });
});
