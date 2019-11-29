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
  NETWORK_OPERATIONS_START
} from './network.constants';

export const getAuthTokenStart = () => ({
  type: GET_AUTH_TOKEN_START
});

export const getAuthTokenSuccess = () => ({
  type: GET_AUTH_TOKEN_SUCCESS
});

export const createUserStart = () => ({
  type: CREATE_USER_START
});

export const createUserSuccess = () => ({
  type: CREATE_USER_SUCCESS
});

export const addBankConnectionStart = () => ({
  type: ADD_BANK_CONNECTION_START
});

export const addBankConnectionSuccess = () => ({
  type: ADD_BANK_CONNECTION_SUCCESS
});

export const getTransactionsStart = () => ({
  type: GET_TRANSACTIONS_START
});

export const getTransactionsSuccess = () => ({
  type: GET_TRANSACTIONS_SUCCESS
});

export const networkOperationsStart = () => ({
  type: NETWORK_OPERATIONS_START
});

export const submitUser = userData => {
  return async dispatch => {
    try {
      dispatch(networkOperationsStart());
      dispatch(getAuthTokenStart());

      console.log('USER DATAAAAAAAAA', userData);
      console.log('aaaaaaaaaaaaaaaa', `Basic ${process.env.REACT_APP_API_KEY}`);
      //   const header = `Basic ${process.env.REACT_APP_API_KEY}`;
      //   const authResponse = await Axios.post(
      //     'https://au-api.basiq.io/token',
      //     {},
      //     {
      //       headers: {
      //         Authorization: `Basic ${process.env.REACT_APP_API_KEY}`,
      //         'Content-Type': 'application/x-www-form-urlencoded',
      //         'basiq-version': '2.0'
      //       }
      //     }
      //   );
      const authResponse = await fetch('http://localhost:8080/token', {
        headers: {
          Authorization: `Basic ${process.env.REACT_APP_API_KEY}`
        }
      });
      const authResponseJson = await authResponse.json();

      dispatch(getAuthTokenSuccess());
      const token = authResponseJson.access_token;
      console.log('AUTH RESPONSE', authResponseJson);

      dispatch(createUserStart());

      console.log('USER BODY', JSON.stringify(userData));
      console.log('AUTH', `Bearer ${token}`);

      const createUserResponse = await fetch('https://au-api.basiq.io/users', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const createUserResponseJson = await createUserResponse.json();

      dispatch(createUserSuccess());

      console.log('CREATE USER RESPOSNE', createUserResponseJson);

      const userId = createUserResponseJson.id;
      const testUser = {
        loginId: 'gavinBelson',
        password: 'hooli2016',
        institution: {
          id: 'AU00000'
        }
      };

      console.log(JSON.stringify(testUser));

      dispatch(addBankConnectionStart());

      const addConnectionResponse = await fetch(
        `https://au-api.basiq.io/users/${userId}/connections`,
        {
          method: 'POST',
          body: JSON.stringify(testUser),
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json'
          }
        }
      );
      const parsedAddConnectionResponse = await addConnectionResponse.json();

      dispatch(addBankConnectionSuccess());

      console.log(
        'PARSED ADD CONNECTION RESPOSNE',
        parsedAddConnectionResponse
      );

      dispatch(getTransactionsStart());

      const sleep = milliseconds => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
      };

      let jobFinished = false;
      let retries = 5;
      do {
        console.log('DOO START ----------------------------------------');
        const job = await fetch(`${parsedAddConnectionResponse.links.self}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json'
          }
        });
        const parsedJob = await job.json();
        const finishedJobs = parsedJob.steps.reduce((accumulator, step) => {
          console.log('AKUMULATOR', accumulator);
          console.log('step', step);
          console.log('step status', step.status);
          if (step.status === 'success') {
            accumulator++;
            return accumulator;
          } else {
            return accumulator;
          }
        }, 0);

        console.log('FINISHED JOBS', finishedJobs);
        console.log('PARSED JOB', parsedJob);
        console.log('RETRIES', retries);

        if (finishedJobs === 3) {
          jobFinished = true;
        } else {
          retries--;
        }
        console.log('DOO END ----------------------------------------');
        await sleep(15000);
      } while (!jobFinished && retries > 0);

      dispatch(getTransactionsSuccess());

      // const getTransactionsResponse = await fetch(
      //   `https://au-api.basiq.io/users/${userId}/transactions`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`
      //     }
      //   }
      // );
      // const parsedGetTransactionsResponse = await getTransactionsResponse.json();

      // console.log(
      //   'PARSED GET TRANSACITON RESPONSE',
      //   parsedGetTransactionsResponse
      // );
    } catch (err) {
      console.log('ERRORRRRRRRRRRRR', err);
    }
  };
};
