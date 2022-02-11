import { createStore } from "redux";
import rootReducer from "../redux";

const store = createStore(rootReducer);

export default store;
