import React from 'react';
import App from './App';
import {
  IN_PROGRESS,
  SUCCESS
} from '../../store/actions/network/network.constants';
import { renderWithReduxAndStyles } from '../../utils/utils';

jest.mock('../CreateUser/CreateUser', () => ({
  __esModule: true,
  default: () => <p>Mock Create User</p>
}));

jest.mock('../NetworkStatus/NetworkStatus', () => ({
  __esModule: true,
  default: () => <p>Mock Network Status</p>
}));

jest.mock('../TransactionData/TransactionData', () => ({
  __esModule: true,
  default: () => <p>Mock Transaction Data</p>
}));

describe('Test App component', () => {
  it('should render correctly', () => {
    const { container } = renderWithReduxAndStyles(<App />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render create user component with default network status', () => {
    const { getByText } = renderWithReduxAndStyles(<App />);

    const mockChild = getByText('Mock Create User');

    expect(mockChild).toBeTruthy();
  });

  it('should render network status component with network status in progress', () => {
    const { getByText } = renderWithReduxAndStyles(<App />, {
      initialState: {
        network: {
          networkStatus: IN_PROGRESS
        }
      }
    });

    const mockChild = getByText('Mock Network Status');

    expect(mockChild).toBeTruthy();
  });

  it('should render transaction data component with network status success', () => {
    const { getByText } = renderWithReduxAndStyles(<App />, {
      initialState: {
        network: {
          networkStatus: SUCCESS
        }
      }
    });

    const mockChild = getByText('Mock Transaction Data');

    expect(mockChild).toBeTruthy();
  });
});
