// import Axios from 'axios';
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
  GET_TRANSACTIONS_ERROR,
  SUCCESS,
  RETRIEVE_TRANSACTIONS
} from './network.constants';
import { sleep } from '../../../utils/utils';

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

export const getTransactionsSuccess = () => ({
  type: GET_TRANSACTIONS_SUCCESS
});

export const getTransactionsError = () => ({
  type: GET_TRANSACTIONS_ERROR
});

export const networkOperationsStart = () => ({
  type: NETWORK_OPERATIONS_START
});

export const submitUser = userData => {
  return async dispatch => {
    let userId;
    let token;
    let parsedAddConnectionResponse;
    let jobFinished = false;
    try {
      dispatch(networkOperationsStart());
      dispatch(getAuthTokenStart());

      const authResponse = await fetch('http://localhost:8080/', {
        headers: {
          Authorization: `Basic ${process.env.REACT_APP_API_KEY}`
        }
      });
      const authResponseParsed = await authResponse.json();

      token = authResponseParsed.access_token;
      dispatch(getAuthTokenSuccess());
    } catch {
      dispatch(getAuthTokenError());
    }
    try {
      dispatch(createUserStart());

      const createUserResponse = await fetch(
        `${process.env.REACT_APP_BASE_ENDPOINT}/users`,
        {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const createUserResponseJson = await createUserResponse.json();

      userId = createUserResponseJson.id;
      dispatch(createUserSuccess());
    } catch {
      dispatch(createUserError());
    }

    try {
      const testUser = {
        loginId: process.env.REACT_APP_LOGIN_ID,
        password: process.env.REACT_APP_LOGIN_PWD,
        institution: {
          id: process.env.REACT_APP_LOGIN_INSTITUTION_ID
        }
      };

      dispatch(addBankConnectionStart());

      const addConnectionResponse = await fetch(
        `${process.env.REACT_APP_BASE_ENDPOINT}/users/${userId}/connections`,
        {
          method: 'POST',
          body: JSON.stringify(testUser),
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json'
          }
        }
      );
      parsedAddConnectionResponse = await addConnectionResponse.json();

      // mozda neki error handling?

      dispatch(addBankConnectionSuccess());
    } catch {
      dispatch(addBankConnectionError());
    }

    try {
      dispatch(connectionJobStart());
      //@TODO: config?
      let retries = 10;
      do {
        //@TODO: config?
        await sleep(15000);

        const job = await fetch(`${parsedAddConnectionResponse.links.self}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json'
          }
        });
        const parsedJob = await job.json();
        const retrieveTransactionJob = parsedJob.steps.find(
          job => job.title === RETRIEVE_TRANSACTIONS
        );

        if (retrieveTransactionJob.status === SUCCESS) {
          jobFinished = true;
        } else {
          retries--;
        }
      } while (!jobFinished && retries > 0);
      if (jobFinished) {
        dispatch(connectionJobSuccess());
      } else {
        dispatch(connectionJobError());
      }
    } catch {
      dispatch(connectionJobError());
    }

    if (jobFinished) {
      try {
        dispatch(getTransactionsStart());
        const getTransactionsResponse = await fetch(
          `${process.env.REACT_APP_BASE_ENDPOINT}/users/${userId}/transactions`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const parsedGetTransactionsResponse = await getTransactionsResponse.json();

        console.log(
          'PARSED GET TRANSACITON RESPONSE',
          parsedGetTransactionsResponse
        );
        dispatch(getTransactionsSuccess());
      } catch {
        dispatch(getTransactionsError());
      }
    }
  };
};
