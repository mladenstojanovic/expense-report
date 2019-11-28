import Axios from 'axios';
const GET_AUTH_TOKEN_START = '[AUTH] Get Auth Token Start';

export const getAuthTokenStart = () => ({
  type: GET_AUTH_TOKEN_START
});

export const submitUser = userData => {
  return async dispatch => {
    try {
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
      const scope = new URLSearchParams(
        'https://au-api.basiq.io/token?scope=CLIENT_ACCESS'
      );
      const authResponse = await fetch(
        'https://au-api.basiq.io/token?scope=CLIENT_ACCESS',
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_API_KEY}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'basiq-version': '2.0'
          },
          body: scope
        }
      );
      console.log('AUTH RESPONSE', authResponse);
    } catch (err) {
      console.log('ERRORRRRRRRRRRRR', err);
    }
  };
};
