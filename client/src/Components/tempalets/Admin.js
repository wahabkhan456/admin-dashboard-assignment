import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setnavItems } from "../../store/actions/index";
import AdminDashboard from "../organisms/admin/AdminHome/AdminDashboard";
import Notification from "../organisms/admin/Notification";
import CreateNewUser from "../organisms/admin/CreateNewUser/CreateNewUser";

function Admin() {
  const selectedNavItem = useSelector(
    (state) => state.NavItems.selectedNavItem,
  );
  console.log(selectedNavItem);
  const dispatch = useDispatch();
  const navItems = [
    { name: "Dashboard" },
    { name: "Notifications" },
    { name: "Add New User" },
  ];
  useEffect(() => {
    dispatch(setnavItems(navItems));
  }, [dispatch]);

  const getComponent = () => {
    if (selectedNavItem === "" || selectedNavItem === undefined) {
      return <AdminDashboard />;
    }
    switch (selectedNavItem) {
      case "Dashboard":
        return <AdminDashboard />;
        break;
      case "Notifications":
        return <Notification />;
        break;
      case "Add New User":
        return <CreateNewUser />;
        break;
      default:
        return <AdminDashboard />;
    }
  };
  return <div>{getComponent()}</div>;
}

export default Admin;
