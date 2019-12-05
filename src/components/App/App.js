import React from 'react';
import { useSelector } from 'react-redux';
import logo from './logo.svg';
import CreateUser from '../CreateUser/CreateUser';
import NetworkStatus from '../NetworkStatus/NetworkStatus';
import { AppHeaderStyle, AppLogoStyle } from './App.style';

const App = () => {
  const hasNetworkStarted = useSelector(state => state.network.inProgress);
  console.log('RENDA SE SVE', hasNetworkStarted);
  return (
    <AppHeaderStyle>
      <AppLogoStyle src={logo} className="App-logo" alt="logo" />
      {hasNetworkStarted ? <NetworkStatus /> : <CreateUser />}
      {/*<NetworkStatus/>*/}
    </AppHeaderStyle>
  );
};

export default App;
