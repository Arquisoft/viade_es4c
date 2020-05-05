import React from "react";
import { shallow } from "enzyme";
import Profile from "./profile.container";

describe("Profile", () => {
  it("should render correctly in 'debug' mode", () => {
    const component = shallow(<Profile debug />);
  
    expect(component).toMatchSnapshot();
  });
});
