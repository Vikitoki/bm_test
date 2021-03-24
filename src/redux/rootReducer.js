import dotsReducer from "./dots/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  dots: dotsReducer,
});

export default rootReducer;
