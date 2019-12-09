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
import {
  getAuthToken,
  createUser,
  addConnection,
  connectionJob,
  getTransactions
} from './networkFetch.actions';

export const getAuthTokenStart = () => ({
  type: GET_AUTH_TOKEN_START
});

export const getAuthTokenSuccess = () => ({
  type: GET_AUTH_TOKEN_SUCCESS
});

export const getAuthTokenError = () => ({
  type: GET_AUTH_TOKEN_ERROR
});

export const createUserStart = () => ({
  type: CREATE_USER_START
});

export const createUserSuccess = () => ({
  type: CREATE_USER_SUCCESS
});

export const createUserError = () => ({
  type: CREATE_USER_ERROR
});

export const addBankConnectionStart = () => ({
  type: ADD_BANK_CONNECTION_START
});

export const addBankConnectionSuccess = () => ({
  type: ADD_BANK_CONNECTION_SUCCESS
});

export const addBankConnectionError = () => ({
  type: ADD_BANK_CONNECTION_ERROR
});

export const connectionJobStart = () => ({
  type: CONNECTION_JOB_START
});

export const connectionJobSuccess = () => ({
  type: CONNECTION_JOB_SUCCESS
});

export const connectionJobError = () => ({
  type: CONNECTION_JOB_ERROR
});

export const getTransactionsStart = () => ({
  type: GET_TRANSACTIONS_START
});

export const getTransactionsSuccess = payload => ({
  type: GET_TRANSACTIONS_SUCCESS,
  payload
});

export const getTransactionsError = () => ({
  type: GET_TRANSACTIONS_ERROR
});

export const networkOperationsStart = () => ({
  type: NETWORK_OPERATIONS_START
});

/**
 * Calls all endpoints in order to get transactions
 * @param {email: string, phone: string} userData
 */
export const submitUser = userData => {
  return async dispatch => {
    const getAuthTokenResponse = await getAuthToken(dispatch);
    if (getAuthTokenResponse.error) {
      return;
    }
    const createUserResponse = await createUser(dispatch, userData);
    if (createUserResponse.error) {
      return;
    }
    const addConnectionResponse = await addConnection(dispatch);
    if (addConnectionResponse.error) {
      return;
    }
    const jobFinished = await connectionJob(
      dispatch,
      20,
      10000,
      addConnectionResponse.parsedAddConnectionResponse
    );
    /* istanbul ignore else */
    if (jobFinished) {
      await getTransactions(dispatch);
    }
  };
};
