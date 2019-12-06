import React from 'react';
import { useSelector } from 'react-redux';
import loader from '../../assets/icons/loader.svg';
import success from '../../assets/icons/success.svg';
import {
  NetworkStatusSingleStyle,
  NetworkStatusStyle
} from './NetworkStatus.style';
import { SUCCESS } from '../../store/actions/network/network.constants';

const NetworkStatus = () => {
  const network = useSelector(state => state.network);

  return (
    <NetworkStatusStyle>
      <NetworkStatusSingleStyle>
        <img src={network.token !== SUCCESS ? loader : success} alt="loader" />{' '}
        <h2>Authenticating</h2>
      </NetworkStatusSingleStyle>
      <NetworkStatusSingleStyle>
        <img
          src={network.createUser !== SUCCESS ? loader : success}
          alt="loader"
        />
        <h2>Creating User</h2>
      </NetworkStatusSingleStyle>
      <NetworkStatusSingleStyle>
        <img
          src={network.addConnection !== SUCCESS ? loader : success}
          alt="loader"
        />
        <h2>Connecting to the bank</h2>
      </NetworkStatusSingleStyle>
      <NetworkStatusSingleStyle>
        <img src={network.job !== SUCCESS ? loader : success} alt="loader" />
        <h2>Waiting for job to finish</h2>
      </NetworkStatusSingleStyle>
      <NetworkStatusSingleStyle>
        <img
          src={network.getTransactions !== SUCCESS ? loader : success}
          alt="loader"
        />
        <h2>Getting transactions</h2>
      </NetworkStatusSingleStyle>
    </NetworkStatusStyle>
  );
};

export default NetworkStatus;
