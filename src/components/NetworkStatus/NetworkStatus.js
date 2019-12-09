import React from 'react';
import { useSelector } from 'react-redux';
import {
  NetworkStatusStyle,
  NetworkStatusErrorStyle
} from './NetworkStatus.style';
import NetworkStatusSingle from './NetworkStatusSingle/NetworkStatusSingle';
import { ERROR } from '../../store/actions/network/network.constants';

const NetworkStatus = () => {
  const network = useSelector(state => state.network);
  const hasErrors = Object.keys(network).find(
    networkSingle => network[networkSingle] === ERROR
  );

  if (hasErrors) {
    return (
      <NetworkStatusErrorStyle data-testid="networkStatusError">
        There has been an error. Please try again
      </NetworkStatusErrorStyle>
    );
  }
  return (
    <NetworkStatusStyle>
      <NetworkStatusSingle
        networkStatus={network.token}
        networkTitle={'Authenticating'}
      />
      <NetworkStatusSingle
        networkStatus={network.createUser}
        networkTitle={'Creating User'}
      />
      <NetworkStatusSingle
        networkStatus={network.addConnection}
        networkTitle={'Connecting to the bank'}
      />
      <NetworkStatusSingle
        networkStatus={network.job}
        networkTitle={'Waiting for job to finish'}
      />
      <NetworkStatusSingle
        networkStatus={network.getTransactions}
        networkTitle={'Getting transactions'}
      />
    </NetworkStatusStyle>
  );
};

export default NetworkStatus;
