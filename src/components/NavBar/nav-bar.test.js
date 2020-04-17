import React from 'react';
import { shallow } from 'enzyme';
import NavBar from "./nav-bar.component";

describe('NavBar', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<NavBar debug />);
  
    expect(component).toMatchSnapshot();
  });
});
