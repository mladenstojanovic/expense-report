import {
  networkOperationsStart,
  getAuthTokenStart,
  getAuthTokenError,
  createUserStart,
  createUserError,
  createUserSuccess,
  addBankConnectionStart,
  addBankConnectionError,
  addBankConnectionSuccess,
  connectionJobStart,
  connectionJobSuccess,
  connectionJobError,
  getTransactionsStart,
  getTransactionsError,
  getAuthTokenSuccess,
  getTransactionsSuccess
} from './network.actions';
import { sleep, sortTransactionData } from '../../../utils/utils';
import { RETRIEVE_TRANSACTIONS, SUCCESS } from './network.constants';

let userId;
let token;
let parsedAddConnectionResponse;
let jobFinished = false;

export const getAuthToken = async dispatch => {
  try {
    dispatch(networkOperationsStart());
    dispatch(getAuthTokenStart());

    const authResponse = await fetch(process.env.REACT_APP_TOKEN_ENDPOINT, {
      headers: {
        Authorization: `Basic ${process.env.REACT_APP_API_KEY}`
      }
    });

    const authResponseParsed = await authResponse.json();

    token = authResponseParsed.access_token;

    if (!token) {
      dispatch(getAuthTokenError());
      return {
        error: true
      };
    }

    dispatch(getAuthTokenSuccess());
    return {
      error: false
    };
  } catch {
    dispatch(getAuthTokenError());
    return {
      error: true
    };
  }
};

export const createUser = async (dispatch, userData) => {
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

    if (!userId) {
      dispatch(createUserError());
      return {
        error: true
      };
    }
    dispatch(createUserSuccess());
    return {
      error: false
    };
  } catch {
    dispatch(createUserError());
    return {
      error: true
    };
  }
};

export const addConnection = async dispatch => {
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

    const jobId = parsedAddConnectionResponse.id;

    if (!jobId) {
      dispatch(addBankConnectionError());
      return {
        error: true
      };
    }

    dispatch(addBankConnectionSuccess());
    return { error: false, parsedAddConnectionResponse };
  } catch {
    dispatch(addBankConnectionError());
    return {
      error: true
    };
  }
};

export const connectionJob = async (
  dispatch,
  pollingRetries,
  pollingTime,
  parsedAddConnectionResponse
) => {
  try {
    dispatch(connectionJobStart());
    let retries = pollingRetries;
    do {
      await sleep(pollingTime);

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
      return true;
    } else {
      dispatch(connectionJobError());
      return false;
    }
  } catch {
    dispatch(connectionJobError());
    return false;
  }
};

export const getTransactions = async dispatch => {
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

    if (!parsedGetTransactionsResponse.data) {
      dispatch(getTransactionsError());
      return;
    }

    dispatch(
      getTransactionsSuccess(
        sortTransactionData(parsedGetTransactionsResponse.data)
      )
    );
  } catch {
    dispatch(getTransactionsError());
  }
};
