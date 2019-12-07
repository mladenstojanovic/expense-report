import React from 'react';
import { SUCCESS } from '../../../store/actions/network/network.constants';
import loader from '../../../assets/icons/loader.svg';
import success from '../../../assets/icons/success.svg';
import { NetworkStatusSingleStyle } from '../NetworkStatus.style';

const NetworkStatusSingle = props => {
  console.log('SINGLE PROPSI,', props);
  return (
    <NetworkStatusSingleStyle>
      <img
        src={props.networkStatus !== SUCCESS ? loader : success}
        alt="loader"
      />{' '}
      <h2>{props.networkTitle}</h2>
    </NetworkStatusSingleStyle>
  );
};

export default NetworkStatusSingle;
