//const { init } = require("../../../../../Models/user");

let initState = {
  isLogin: false,
};

const LoginStatus = (state = initState, action) => {
  switch (action.type) {
    case "LOGED_IN":
      state.isLogin = true;
      return {
        ...state,
        isLogin: true,
      };
    case "LOG_OUT":
      state.isLogin = false;
      return {
        state,
      };
    default:
      return state;
  }
};

export default LoginStatus;
