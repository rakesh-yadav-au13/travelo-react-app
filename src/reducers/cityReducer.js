import { cityAction } from "../actions";
const initialState = "";

const CityReducer = (state = initialState, action) => {
  switch (action.type) {
    case cityAction.ADD_CITY:
      return (state = action.payload);
    default:
      return state;
  }
};

export default CityReducer;
