import React from "react";
import { shallow } from "enzyme";
import Spacer from "./spacer.component";

describe("Spacer", () => {
  it("should render correctly in 'debug' mode", () => {
    const component = shallow(<Spacer debug />);
  
    expect(component).toMatchSnapshot();
  });
});
