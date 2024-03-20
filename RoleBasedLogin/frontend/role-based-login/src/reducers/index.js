import { combineReducers } from "redux";

import api from "../api";
import LoginSlice from "../slices/loginSlice";

const rootReducer = combineReducers({
  LoginSlice,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
