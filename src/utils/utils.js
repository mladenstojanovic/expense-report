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
