import {
  sleep,
  sortTransactionData,
  isEmailValid,
  isPhoneNumberValid
} from './utils';

const mockTransactionData = [
  {
    amount: '-9.31',
    subClass: {
      title: 'Cafes',
      code: '451'
    }
  },
  {
    amount: '-9.04',
    subClass: {
      title: 'Restaurants',
      code: '452'
    }
  },
  {
    amount: '55.35',
    subClass: null
  },
  {
    amount: '-5',
    subClass: {
      title: 'Cafes',
      code: '451'
    }
  }
];

describe('Test sleep util function', () => {
  jest.useFakeTimers();

  it('should call the setTimeout function with correct params', () => {
    sleep(5000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
  });
});

describe('Test sortTransactionData function', () => {
  it('should return correct data with given mock transaction data', () => {
    const sortedData = sortTransactionData(mockTransactionData);

    const expectedDataOutput = {
      '451': {
        numOfTransactions: 2,
        total: 14.31,
        title: 'Cafes'
      },
      '452': {
        numOfTransactions: 1,
        total: 9.04,
        title: 'Restaurants'
      }
    };

    expect(sortedData).toEqual(expectedDataOutput);
  });
});

describe('Test isEmailValid function', () => {
  it('should return false if incorrect mails are sent', () => {
    expect(isEmailValid('@@@@@@')).toBe(false);
    expect(isEmailValid('a@a')).toBe(false);
    expect(isEmailValid('aaaa@aaa@aa.com')).toBe(false);
    expect(isEmailValid('aaa@aaa.com@aaa.com')).toBe(false);
    expect(isEmailValid('aaa@.com')).toBe(false);
  });
  it('should return true if valid email is sent', () => {
    expect(isEmailValid('mla@sto.com')).toBe(true);
  });
});

describe('Test isPhoneNumberValid function', () => {
  it('should return false if incorrect phone numbers are sent', () => {
    expect(isPhoneNumberValid('@@@@@')).toBe(false);
    expect(isPhoneNumberValid('123456aaaaa')).toBe(false);
    expect(isPhoneNumberValid('123456789aaaaa')).toBe(false);
    expect(isPhoneNumberValid('123')).toBe(false);
  });
  it('should return true if valid phone number is sent', () => {
    expect(isPhoneNumberValid('+381641234567')).toBe(true);
    expect(isPhoneNumberValid('381641234567')).toBe(true);
    expect(isPhoneNumberValid('0641234567')).toBe(true);
    expect(isPhoneNumberValid('(064)1234567')).toBe(true);
  });
});
