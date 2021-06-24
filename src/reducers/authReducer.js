import { authAction } from "../actions";

const initialState = {
  isAuth: false,
  profile: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authAction.IS_LOGIN:
      return (state = {
        isAuth: true,
        profile: { ...action.payload },
      });
    case authAction.IS_LOGOUT:
      return (state = {
        isAuth: false,
        profile: {},
      });
    default:
      return state;
  }
};

export default authReducer;
