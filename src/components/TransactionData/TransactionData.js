import React from 'react';
import { useSelector } from 'react-redux';
import {
  TransactionDataSingleStyle,
  TransactionDataNumbersStyle
} from './TransactionData.style';

const TransactionData = () => {
  const transactionData = useSelector(state => state.network.transactionData);
  return Object.keys(transactionData).map(category => (
    <TransactionDataSingleStyle key={category}>
      <h1>{transactionData[category].title}</h1>
      <TransactionDataNumbersStyle>
        <p>
          Number of transactions: {transactionData[category].numOfTransactions}
        </p>
        <p>Total spent: {transactionData[category].total.toFixed(2)}</p>
        <p>
          Average amount spent:{' '}
          {(
            transactionData[category].total /
            transactionData[category].numOfTransactions
          ).toFixed(2)}
        </p>
      </TransactionDataNumbersStyle>
    </TransactionDataSingleStyle>
  ));
};

export default TransactionData;
