import React from 'react';
import { render } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import networkReducer from '../store/reducers/network.reducer';
import theme from '../styles/theme';

export const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export const sortTransactionData = data => {
  const sortedData = {};
  for (let index = 0; index < data.length; index++) {
    if (!data[index].subClass) {
      continue;
    }
    if (!sortedData[data[index].subClass.code]) {
      sortedData[data[index].subClass.code] = {
        total: 0,
        numOfTransactions: 0,
        title: data[index].subClass.title
      };
    }
    sortedData[data[index].subClass.code].total += Math.abs(
      parseInt(data[index].amount)
    );
    sortedData[data[index].subClass.code].numOfTransactions++;
  }
  return sortedData;
};

export const isEmailValid = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPhoneNumberValid = phone =>
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone);

export const renderWithReduxAndStyles = (
  ui,
  {
    initialState,
    store = createStore(
      combineReducers({ network: networkReducer }),
      initialState
    )
  } = {}
) => ({
  ...render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </Provider>
  ),
  store
});
