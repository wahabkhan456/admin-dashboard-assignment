import React, { useEffect } from "react";
import Admin from "../tempalets/Admin";
import { useSelector } from "react-redux";
import Client from "../tempalets/Client";
import "./Layout.css";
export default function Layout(props) {
  const userType = useSelector((state) => state.User.userType);
  const Login = useSelector((state) => state.Login.isLogin);
  useEffect(() => {
    if (!Login) {
      props.history.push("/login");
    }
  });

  //const userType = 1;

  let renderComponent = "";
  switch (userType) {
    case 1:
      renderComponent = <Admin />;
      break;
    case 2:
      renderComponent = <Client />;
      break;
    default:
      renderComponent = "";
  }
  return <div className="Layout">{renderComponent}</div>;
}
