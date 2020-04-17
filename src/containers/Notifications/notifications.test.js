import React from 'react';
import { shallow } from 'enzyme';
import Notifications from "./notifications.component";

describe('Notifications', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Notifications debug />);
  
    expect(component).toMatchSnapshot();
  });
});
