import React from 'react';
import { PropTypes } from 'prop-types';
import { SUCCESS } from '../../../store/actions/network/network.constants';
import loader from '../../../assets/icons/loader.svg';
import success from '../../../assets/icons/success.svg';
import { NetworkStatusSingleStyle } from '../NetworkStatus.style';

const NetworkStatusSingle = props => (
  <NetworkStatusSingleStyle>
    <img
      src={props.networkStatus !== SUCCESS ? loader : success}
      alt="loader"
    />{' '}
    <h2>{props.networkTitle}</h2>
  </NetworkStatusSingleStyle>
);

NetworkStatusSingle.propTypes = {
  networkStatus: PropTypes.string.isRequired,
  networkTitle: PropTypes.string.isRequired
};

export default NetworkStatusSingle;
