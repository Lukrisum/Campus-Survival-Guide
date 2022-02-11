import { combineReducers } from "redux";
import commentAreaReducer from "./redux";

const rootReducer = combineReducers(commentAreaReducer);

export default rootReducer;