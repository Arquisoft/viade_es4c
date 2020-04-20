import React from 'react';
import { shallow } from 'enzyme';
import RoutesCarousel from "./routes-carousel.component";

describe('RoutesCarousel', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<RoutesCarousel debug />);
  
    expect(component).toMatchSnapshot();
  });
});
