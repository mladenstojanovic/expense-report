import React from 'react';
import { useSelector } from 'react-redux';

const NetworkStatus = () => {
  const network = useSelector(state => state.network);
  const NOT_STARTED = 'Waiting...';

  return (
    <>
      <div>Authenticating: {network.token || NOT_STARTED}</div>
      <div>Creating User: {network.createUser || NOT_STARTED}</div>
      <div>Connecting to the bank: {network.addConnection || NOT_STARTED}</div>
      <div>Getting transactions: {network.getTransactions || NOT_STARTED}</div>
    </>
  );
};

export default NetworkStatus;
