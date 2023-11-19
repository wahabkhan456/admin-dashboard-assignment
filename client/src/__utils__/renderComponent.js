import React from "react";
import { Provider } from "react-redux";
import { configure, mount } from "enzyme";
import configureStore from "redux-mock-store";
export const getComponent = (Component, state) => {
  let store;
  let wrapper;
  const mockStore = configureStore([]);
  store = mockStore(state);
  let props = [];
  wrapper = mount(
    <Provider store={store}>
      <Component {...props} />
    </Provider>,
  );
  return wrapper;
};
