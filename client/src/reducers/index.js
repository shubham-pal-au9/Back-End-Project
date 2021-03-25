import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import user from './user';
import ticket from './ticket';

export default combineReducers({
  alert,
  auth,
  user,
  ticket,
});
