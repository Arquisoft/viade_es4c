import React from 'react';
import { shallow } from 'enzyme';
import MyRoutes from "./myRoutes.container";

describe('MyRoutes', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<MyRoutes debug />);
  
    expect(component).toMatchSnapshot();
  });
});
