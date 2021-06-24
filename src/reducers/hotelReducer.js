import { hotelAction } from "../actions";
const initialState = "";

const hotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case hotelAction.ADD_HOTELS:
      return (state = action.payload);
    default:
      return state;
  }
};

export default hotelReducer;
