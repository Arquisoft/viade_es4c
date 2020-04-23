import React from "react";
import { shallow } from "enzyme";
import Toaster from "./toaster.component";

describe("Toaster", () => {
  it("should render correctly in 'debug' mode", () => {
    const component = shallow(<Toaster debug />);
  
    expect(component).toMatchSnapshot();
  });
});
