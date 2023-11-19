import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClientInfo from "../organisms/client/CompanyInfo/ClientInfo";
import Pending from "../organisms/client/Pending/Pending";
import Wellcome from "../organisms/client/Wellcome/Wellcome";
import { setnavItems } from "../../store/actions/index";
import "./client.css";

export default function Client() {
  const isauth = useSelector((state) => state.User.isauth);
  let componet = "";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setnavItems([{ name: "Home" }]));
  }, []);

  switch (isauth) {
    case 1:
      componet = <ClientInfo />;
      break;
    case 2:
      componet = <Pending />;
      break;
    case 3:
      componet = <Wellcome />;
      break;
    default:
      componet = "";
  }
  return <div>{componet}</div>;
}
