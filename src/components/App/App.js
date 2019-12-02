import React from 'react';
import { useSelector } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import CreateUser from '../CreateUser/CreateUser';
import NetworkStatus from '../NetworkStatus/NetworkStatus';

const App = () => {
  const hasNetworkStarted = useSelector(state => state.network.inProgress);
  console.log('RENDA SE SVE', hasNetworkStarted);
  return (
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      {hasNetworkStarted ? <NetworkStatus /> : <CreateUser />}
    </div>
  );
};

export default App;
