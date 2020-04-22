import React from "react";
import { shallow } from "enzyme";
import ShareForm from "./share-form.component";

describe("ShareForm", () => {
  it("should render correctly in 'debug' mode", () => {
    const component = shallow(<ShareForm debug />);
  
    expect(component).toMatchSnapshot();
  });
});
