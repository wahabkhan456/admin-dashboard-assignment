import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { getComponent } from "../__utils__/renderComponent";
//import renderer from "react-test-renderer";
configure({ adapter: new Adapter() });

import Layout from "../Components/pages/Layout";

describe("Layout unit testing", () => {
  let wrapper;

  it("Should render Admin if userType is 1", () => {
    wrapper = getComponent(Layout, {
      Login: {
        isLogin: true,
      },
      User: {
        isauth: 1,
        userType: 1,
        userId: "",
      },
      NavItems: {
        selectedNavItem: "Dashboard",
      },
    });
    expect(wrapper.find("Admin")).toHaveLength(1);
  });

  it("Should render Client if userType is 2", () => {
    wrapper = getComponent(Layout, {
      Login: {
        isLogin: true,
      },
      User: {
        isauth: 1,
        userType: 2,
        userId: "",
      },
      NavItems: {
        selectedNavItem: "Dashboard",
      },
    });
    expect(wrapper.find("Client")).toHaveLength(1);
  });
});
