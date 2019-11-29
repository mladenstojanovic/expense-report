import React from 'react';
import { useSelector } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import CreateUser from '../CreateUser/CreateUser';
import NetworkStatus from '../NetworkStatus/NetworkStatus';
import { Box, Flex } from 'rebass';

const App = () => {
  const hasNetworkStarted = useSelector(state => state.network.inProgress);
  console.log('RENDA SE SVE', hasNetworkStarted);
  return (
    <Flex>
      <Box
        width={1 / 1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bg="primary"
        minHeight="100vh"
      >
        <img src={logo} className="App-logo" alt="logo" />
        {hasNetworkStarted ? <NetworkStatus /> : <CreateUser />}
      </Box>
    </Flex>
  );
};

export default App;
