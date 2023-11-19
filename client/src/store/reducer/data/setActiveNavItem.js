const initState = {
  navItems: [],
  selectedNavItem: "",
};

const setActiveNavItem = (state = initState, action) => {
  switch (action.type) {
    case "SET_NAV_ITEMS":
      state.navItems = action.navItems;
      return {
        ...state,
        navItems: action.items,
      };
    case "SET_ACTIVE_NAV_ITEM":
      state.selectedNavItem = action.item;
      return {
        ...state,
        selectedNavItem: action.item,
      };
    default:
      return state;
  }
};

export default setActiveNavItem;
