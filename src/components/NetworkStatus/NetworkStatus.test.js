import React from 'react';
import NetworkStatus from './NetworkStatus';
import { renderWithReduxAndStyles } from '../../utils/utils';
import {
  IN_PROGRESS,
  SUCCESS
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
});
