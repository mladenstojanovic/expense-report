import React from 'react';
import NetworkStatus from './NetworkStatus';
import { renderWithReduxAndStyles } from '../../utils/utils';
import {
  IN_PROGRESS,
  SUCCESS,
  ERROR
} from '../../store/actions/network/network.constants';

describe('Test NetworkStatus component', () => {
  it('should render correctly when everything in network is loading', () => {
    const { container } = renderWithReduxAndStyles(<NetworkStatus />, {
      initialState: {
        network: {
          token: IN_PROGRESS,
          createUser: IN_PROGRESS,
          addConnection: IN_PROGRESS,
          job: IN_PROGRESS,
          getTransactions: IN_PROGRESS
        }
      }
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render correctly when everything in network is successful', () => {
    const { container } = renderWithReduxAndStyles(<NetworkStatus />, {
      initialState: {
        network: {
          token: SUCCESS,
          createUser: SUCCESS,
          addConnection: SUCCESS,
          job: SUCCESS,
          getTransactions: SUCCESS
        }
      }
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render error message when there is an error in token', () => {
    const { getByTestId } = renderWithReduxAndStyles(<NetworkStatus />, {
      initialState: {
        network: {
          token: ERROR,
          createUser: SUCCESS,
          addConnection: SUCCESS,
          job: SUCCESS,
          getTransactions: SUCCESS
        }
      }
    });

    const errorMessage = getByTestId('networkStatusError');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render error message when there is an error in createUser', () => {
    const { getByTestId } = renderWithReduxAndStyles(<NetworkStatus />, {
      initialState: {
        network: {
          token: SUCCESS,
          createUser: ERROR,
          addConnection: SUCCESS,
          job: SUCCESS,
          getTransactions: SUCCESS
        }
      }
    });

    const errorMessage = getByTestId('networkStatusError');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render error message when there is an error in addConnection', () => {
    const { getByTestId } = renderWithReduxAndStyles(<NetworkStatus />, {
      initialState: {
        network: {
          token: SUCCESS,
          createUser: SUCCESS,
          addConnection: ERROR,
          job: SUCCESS,
          getTransactions: SUCCESS
        }
      }
    });

    const errorMessage = getByTestId('networkStatusError');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render error message when there is an error in job', () => {
    const { getByTestId } = renderWithReduxAndStyles(<NetworkStatus />, {
      initialState: {
        network: {
          token: SUCCESS,
          createUser: SUCCESS,
          addConnection: SUCCESS,
          job: ERROR,
          getTransactions: SUCCESS
        }
      }
    });

    const errorMessage = getByTestId('networkStatusError');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render error message when there is an error in getTransactions', () => {
    const { getByTestId } = renderWithReduxAndStyles(<NetworkStatus />, {
      initialState: {
        network: {
          token: SUCCESS,
          createUser: SUCCESS,
          addConnection: SUCCESS,
          job: SUCCESS,
          getTransactions: ERROR
        }
      }
    });

    const errorMessage = getByTestId('networkStatusError');

    expect(errorMessage).toBeInTheDocument();
  });
});
