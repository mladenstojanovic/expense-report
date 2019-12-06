import React from 'react';
import { useSelector } from 'react-redux';
import logo from './logo.svg';
import CreateUser from '../CreateUser/CreateUser';
import NetworkStatus from '../NetworkStatus/NetworkStatus';
import { AppHeaderStyle, AppLogoStyle } from './App.style';
import {
  IDLE,
  IN_PROGRESS
} from '../../store/actions/network/network.constants';
import TransactionData from '../TransactionData/TransactionData';

const App = () => {
  const networkStatus = useSelector(state => state.network.networkStatus);
  console.log('RENDA SE SVE', networkStatus);
  return (
    <AppHeaderStyle>
      <AppLogoStyle src={logo} className="App-logo" alt="logo" />
      {/* {networkStatus === IDLE ? <CreateUser /> : networkStatus === IN_PROGRESS ? <NetworkStatus /> : <TransactionData />} */}
      <TransactionData />
    </AppHeaderStyle>
  );
};

export default App;
