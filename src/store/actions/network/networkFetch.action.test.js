import {
  getAuthTokenSuccess,
  getAuthTokenError,
  createUserSuccess,
  createUserError,
  addBankConnectionSuccess,
  addBankConnectionError,
  connectionJobSuccess,
  connectionJobError,
  getTransactionsError
} from './network.actions';
import {
  GET_TRANSACTIONS_SUCCESS,
  RETRIEVE_TRANSACTIONS,
  SUCCESS,
  IN_PROGRESS
} from './network.constants';
import {
  getTransactions,
  connectionJob,
  addConnection,
  createUser,
  getAuthToken
} from './networkFetch.actions';

describe('Test getAuthToken network action', () => {
  it('should call dispatch success when getting token', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        access_token: '123'
      })
    });
    const dispatch = jest.fn();

    await getAuthToken(dispatch);

    expect(global.fetch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith(getAuthTokenSuccess());
  });
  it('should call dispatch error when there is an error', async () => {
    global.fetch = jest.fn();
    const dispatch = jest.fn();

    await getAuthToken(dispatch);

    expect(global.fetch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith(getAuthTokenError());
  });
  it('should call dispatch error when there is no token', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        access_token: ''
      })
    });
    const dispatch = jest.fn();

    await getAuthToken(dispatch);

    expect(global.fetch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith(getAuthTokenError());
  });
});

describe('Test createUser network action', () => {
  it('should call dispatch success when creating user successful', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        id: '123'
      })
    });
    const dispatch = jest.fn();

    await createUser(dispatch);

    expect(global.fetch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(createUserSuccess());
  });
  it('should call dispatch error when there is an error', async () => {
    global.fetch = jest.fn();
    const dispatch = jest.fn();

    await createUser(dispatch);

    expect(global.fetch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(createUserError());
  });
  it('should call dispatch error when there is no id', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        id: ''
      })
    });
    const dispatch = jest.fn();

    await createUser(dispatch);

    expect(global.fetch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(createUserError());
  });
});

describe('Test addConnection network action', () => {
  it('should call dispatch success when add connection is successful', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        id: '123'
      })
    });
    const dispatch = jest.fn();

    await addConnection(dispatch);

    expect(global.fetch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(addBankConnectionSuccess());
  });
  it('should call dispatch error when there is an error', async () => {
    global.fetch = jest.fn();
    const dispatch = jest.fn();

    await addConnection(dispatch);

    expect(global.fetch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(addBankConnectionError());
  });
  it('should call dispatch error when there is no id', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        id: ''
      })
    });
    const dispatch = jest.fn();

    await addConnection(dispatch);

    expect(global.fetch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(addBankConnectionError());
  });
});

describe('Test connectionJob network action', () => {
  it('should call dispatch error when response is not finished within given retries', async () => {
    const inProgressResponse = {
      steps: [
        {
          title: RETRIEVE_TRANSACTIONS,
          status: IN_PROGRESS
        }
      ]
    };
    const successResponse = {
      steps: [
        {
          title: RETRIEVE_TRANSACTIONS,
          status: IN_PROGRESS
        }
      ]
    };

    global.fetch = jest
      .fn()
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(inProgressResponse)
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(inProgressResponse)
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(successResponse)
      });
    const dispatch = jest.fn();

    await connectionJob(dispatch, 3, 10, {
      links: {
        self: 'mock link'
      }
    });

    expect(global.fetch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(connectionJobError());
  });
  it('should call dispatch success when retrieve transaction finished', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        steps: [
          {
            title: RETRIEVE_TRANSACTIONS,
            status: SUCCESS
          }
        ]
      })
    });
    const dispatch = jest.fn();

    await connectionJob(dispatch, 2, 10, {
      links: {
        self: 'mock link'
      }
    });

    expect(global.fetch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(connectionJobSuccess());
  });
  it('should call dispatch error when retrieve transaction has an error', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn()
    });
    const dispatch = jest.fn();

    await connectionJob(dispatch, 2, 10, {
      links: {
        self: 'mock link'
      }
    });

    expect(global.fetch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(connectionJobError());
  });
});

describe('Test getTransactions network action', () => {
  jest.mock('../../../utils/utils', () => ({
    sortTransactionData: jest.fn()
  }));

  it('should call dispatch success when getting transaction is successful', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        data: 'test data'
      })
    });
    const dispatch = jest.fn();

    await getTransactions(dispatch);

    expect(global.fetch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: GET_TRANSACTIONS_SUCCESS,
      payload: {}
    });
  });

  it('should call dispatch error when getting transaction throws an error', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn()
    });
    const dispatch = jest.fn();

    await getTransactions(dispatch);

    expect(global.fetch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(getTransactionsError());
  });

  it('should call dispatch error when getting transaction data is empty', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        data: null
      })
    });
    const dispatch = jest.fn();

    await getTransactions(dispatch);

    expect(global.fetch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(getTransactionsError());
  });
});
