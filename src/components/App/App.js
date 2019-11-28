import React from 'react';
import { useSelector } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import CreateUser from '../CreateUser/CreateUser';

const App = () => {
  const test = useSelector(state => state.user.testValue);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {test && <p>Mladja voli maju</p>}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <CreateUser />
      </header>
    </div>
  );
};

export default App;
