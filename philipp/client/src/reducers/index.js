import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import authReducer from "./authReducer";
import comments from "./comment";
import dialog from "./dialog";

export default combineReducers({
  alert,
  auth,
  profile,
  authReducer,
  comments,
  dialog,
});
