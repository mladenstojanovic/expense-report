import React from 'react';
import TransactionData from './TransactionData';
import { renderWithReduxAndStyles } from '../../utils/utils';

const initialState = {
  network: {
    transactionData: {
      '123': {
        numOfTransactions: 3,
        total: 300,
        title: 'Test1'
      },
      '321': {
        numOfTransactions: 2,
        total: 1001,
        title: 'Test2'
      }
    }
  }
};

describe('Test TransactionData component', () => {
  it('should render correctly with data in place', () => {
    const { container, getByText } = renderWithReduxAndStyles(
      <TransactionData />,
      {
        initialState
      }
    );

    const {
      network: { transactionData }
    } = initialState;

    expect(container.firstChild).toMatchSnapshot();
    expect(
      getByText(
        `Number of transactions: ${transactionData['123'].numOfTransactions}`
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        `Number of transactions: ${transactionData['321'].numOfTransactions}`
      )
    ).toBeInTheDocument();
    expect(
      getByText(`Total spent: ${transactionData['123'].total.toFixed(2)}`)
    ).toBeInTheDocument();
    expect(
      getByText(`Total spent: ${transactionData['321'].total.toFixed(2)}`)
    ).toBeInTheDocument();
    expect(
      getByText(
        `Average amount spent: ${(
          transactionData['123'].total /
          transactionData['123'].numOfTransactions
        ).toFixed(2)}`
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        `Average amount spent: ${(
          transactionData['321'].total /
          transactionData['321'].numOfTransactions
        ).toFixed(2)}`
      )
    ).toBeInTheDocument();
  });
});
