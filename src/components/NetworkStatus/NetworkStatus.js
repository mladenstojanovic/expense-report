import React from 'react';
import { useSelector } from 'react-redux';
import { NetworkStatusStyle } from './NetworkStatus.style';
import NetworkStatusSingle from './NetworkStatusSingle/NetworkStatusSingle';

const NetworkStatus = () => {
  const network = useSelector(state => state.network);
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
