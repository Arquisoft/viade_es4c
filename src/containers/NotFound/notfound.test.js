import React from 'react';
import { shallow } from 'enzyme';
import NotFound from "./notfound.component";

describe('NotFound', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<NotFound debug />);
  
    expect(component).toMatchSnapshot();
  });
});
