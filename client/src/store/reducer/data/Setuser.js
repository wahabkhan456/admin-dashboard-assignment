const initState = {
  isauth: 1,
  userType: 0,
  userId: "",
};

const setUser = (state = initState, action) => {
  switch (action.type) {
    case "ADMIN":
      return {
        ...state,
        userType: 1,
        userId: action.userId,
      };
    case "CLIENT":
      state.isauth = action.isauth;
      state.userType = action.userType;
      state.userId = action.userId;
      return {
        ...state,
        userType: 2,
        isauth: action.isauth,
        userId: action.userId,
      };
    default:
      return state;
  }
};

export default setUser;
