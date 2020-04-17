import React from 'react';
import { shallow } from 'enzyme';
import Share from "./share.container";

describe('Share', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Share debug />);
  
    expect(component).toMatchSnapshot();
  });
});
