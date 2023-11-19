import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { getComponent } from "../__utils__/renderComponent";
configure({ adapter: new Adapter() });
import Admin from "../Components/tempalets/Admin";

describe("Admin unit testing", () => {
  let wrapper;
  it("Should contain AdminDashboard if selectedNavItem is Dashboard", () => {
    wrapper = getComponent(Admin, {
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
    expect(wrapper.find("AdminDashboard")).toHaveLength(1);
  });
});
