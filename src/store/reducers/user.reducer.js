const initialState = {
  testValue: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'test action':
      return {
        ...state,
        testValue: !state.testValue
      };
    default:
      return state;
  }
};

export default userReducer;
