import React from 'react';
import { useSelector } from 'react-redux';
import loader from './loader.svg';
import success from './success.svg';
import {
  NetworkStatusSingleStyle,
  NetworkStatusStyle
} from './NetworkStatus.style';
import { IN_PROGRESS } from '../../store/actions/network/network.constants';

const NetworkStatus = () => {
  const network = useSelector(state => state.network);
  const NOT_STARTED = 'Waiting...';

  return (
    <NetworkStatusStyle>
      <NetworkStatusSingleStyle>
        <img
          src={network.token === IN_PROGRESS ? loader : success}
          alt="loader"
        />{' '}
        <h2>Authenticating: {network.token || NOT_STARTED}</h2>
      </NetworkStatusSingleStyle>
      <NetworkStatusSingleStyle>
        <img
          src={network.token === IN_PROGRESS ? loader : success}
          alt="loader"
        />
        <h2>Creating User: {network.createUser || NOT_STARTED}</h2>
      </NetworkStatusSingleStyle>
      <NetworkStatusSingleStyle>
        <img
          src={network.token === IN_PROGRESS ? loader : success}
          alt="loader"
        />
        <h2>Connecting to the bank: {network.addConnection || NOT_STARTED}</h2>
      </NetworkStatusSingleStyle>
      <NetworkStatusSingleStyle>
        <img
          src={network.token === IN_PROGRESS ? loader : success}
          alt="loader"
        />
        <h2>Getting transactions: {network.getTransactions || NOT_STARTED}</h2>
      </NetworkStatusSingleStyle>
    </NetworkStatusStyle>
  );
};

export default NetworkStatus;
