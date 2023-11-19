import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { getComponent } from "../__utils__/renderComponent";
configure({ adapter: new Adapter() });
import Client from "../Components/tempalets/Client";

describe("Client Unit testing", () => {
  let wrapper;
  it("Should contain render Pending if isauth is 2", () => {
    wrapper = getComponent(Client, {
      Login: {
        isLogin: true,
      },
      User: {
        isauth: 2,
        userType: 2,
        userId: "",
      },
      NavItems: {
        selectedNavItem: "Dashboard",
      },
    });
    expect(wrapper.find("Pending")).toHaveLength(1);
  });

  it("Should contain render ClientInfo if isauth is 1", () => {
    wrapper = getComponent(Client, {
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
    expect(wrapper.find("ClientInfo")).toHaveLength(1);
  });

  it("Should contain render Wellcome if isauth is 3", () => {
    wrapper = getComponent(Client, {
      Login: {
        isLogin: true,
      },
      User: {
        isauth: 3,
        userType: 2,
        userId: "",
      },
      NavItems: {
        selectedNavItem: "Dashboard",
      },
    });
    expect(wrapper.find("Wellcome")).toHaveLength(1);
  });
});
