import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
import hotelReducer from "./hotelReducer";
import authReducer from "./authReducer";

export default combineReducers({
  cityReducer,
  hotelReducer,
  authReducer,
});
