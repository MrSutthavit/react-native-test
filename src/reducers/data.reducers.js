import {combineReducers} from 'redux';

const getMember = (state = {}, action) => {
  switch (action.type) {
    case 'GET_MEMBER_SUCCESS':
      return {
        isSuccess: true,
        isResult: action.payload,
        error: null,
      };
    case 'GET_MEMBER_FAIL':
      return {
        isSuccess: false,
        isResult: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default combineReducers({
  getMember,
});
