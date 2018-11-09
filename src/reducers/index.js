import { combineReducers } from "redux";
import CreatePageReducer from "./CreatePageReducer";
import SiteDataReducer from "./SiteDataReducer";

export default combineReducers({
  siteContent: SiteDataReducer,
});
