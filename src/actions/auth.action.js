export const SendMember = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'GET_MEMBER_SUCCESS',
        payload: payload,
      });
      return payload;
    } catch (error) {
      console.log(error);
    }
  };
};
