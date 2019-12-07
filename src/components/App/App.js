import React from 'react';
import { useSelector } from 'react-redux';
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
  return (
    <AppHeaderStyle>
      <AppLogoStyle
        src={'https://basiq.io/a0a4ce023263c9b295846d60914ed319.svg'}
        className="App-logo"
        alt="logo"
      />
      {networkStatus === IDLE ? (
        <CreateUser />
      ) : networkStatus === IN_PROGRESS ? (
        <NetworkStatus />
      ) : (
        <TransactionData />
      )}
    </AppHeaderStyle>
  );
};

export default App;
