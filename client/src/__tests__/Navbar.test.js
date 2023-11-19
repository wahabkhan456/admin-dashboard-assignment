import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { getComponent } from "../__utils__/renderComponent";
configure({ adapter: new Adapter() });
import NavItems from "../Components/molecules/Navbar/NavItems";

describe("nav bar unit testing", () => {
  let wrapper;
  it("Should render nav items if user is login", () => {
    wrapper = getComponent(NavItems, {
      Login: {
        isLogin: true,
      },
      User: {
        isauth: 1,
        userType: 1,
        userId: "",
      },
      NavItems: {
        navItems: [
          { name: "Dashboard" },
          { name: "Notifications" },
          { name: "Add New User" },
        ],
        selectedNavItem: "Dashboard",
      },
    });
    expect(wrapper.exists(".navitems")).toEqual(true);
  });
  it("Should not render nav items if user is not login", () => {
    wrapper = getComponent(NavItems, {
      Login: {
        isLogin: false,
      },
      User: {
        isauth: 2,
        userType: 1,
        userId: "",
      },
      NavItems: {
        navItems: [
          { name: "Dashboard" },
          { name: "Notifications" },
          { name: "Add New User" },
        ],
        selectedNavItem: "Dashboard",
      },
    });
    expect(wrapper.exists(".navitems")).toEqual(false);
  });
});
