import { combineReducers } from "redux";
import LoginStatus from "./data/LoginStatus";
import setUser from "./data/Setuser";
import setActiveNavItem from "./data/setActiveNavItem";

const rootReducer = combineReducers({
  Login: LoginStatus,
  User: setUser,
  NavItems: setActiveNavItem,
});

export default rootReducer;
