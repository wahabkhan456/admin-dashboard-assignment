import API from "../../Helper/Api";
export const login = (isauth) => {
  return {
    type: "LOGED_IN",
  };
};

export const setnavItems = (items) => {
  return {
    type: "SET_NAV_ITEMS",
    items,
  };
};

export const setActiveNavItem = (item) => {
  return {
    type: "SET_ACTIVE_NAV_ITEM",
    item,
  };
};

export const setUserType = (userType, isauth, userId) => {
  console.log("IN SET USER");
  localStorage.setItem("userType", userType);
  sessionStorage.setItem("isauth", isauth);
  sessionStorage.setItem("userId", userId);
  if (userType === "1")
    return {
      type: "ADMIN",
      userId,
    };
  else {
    return {
      type: "CLIENT",
      isauth,
      userId,
    };
  }
};

export const setExpirationDate = () => {
  const d = new Date();
  const newDate = new Date(new Date(d).setHours(d.getHours() + 24));
  localStorage.setItem("expirationDate", newDate);
};

export const logout = () => {
  console.log("In LOGOUT");
  localStorage.removeItem("expirationDate");
  sessionStorage.removeItem("userType");
  sessionStorage.removeItem("isauth");
  localStorage.removeItem("userId");
  return {
    type: "LOG_OUT",
  };
};

const autoLogout = (id) => {
  API.get("/waiting/reject?userId=" + id)
    .then((response) => {})
    .catch((error) => {
      console.log(error.response);
    });
};

export const checkStatus = () => {
  return (dispatch) => {
    const now = new Date();
    let userType = localStorage.getItem("userType");
    let isauth = sessionStorage.getItem("isauth");
    console.log(isauth);
    let userId = sessionStorage.getItem("userId");
    let expirationdate = localStorage.getItem("expirationDate");
    console.log(isauth, userId);
    if (expirationdate) {
      if (now > expirationdate) {
        dispatch(autoLogout(userId));
      }
    }
    if (isauth) {
      dispatch(login());

      userId = userId.toString();
      isauth = parseInt(isauth);
      userType = userType.toString();
      dispatch(setUserType(userType, isauth, userId));
    }
  };
};
