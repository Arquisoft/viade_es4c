import React from 'react';
import { shallow } from 'enzyme';
import AuthNavBar from "./auth-nav-bar.component";

describe('AuthNavBar', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<AuthNavBar debug />);
  
    expect(component).toMatchSnapshot();
  });
});
