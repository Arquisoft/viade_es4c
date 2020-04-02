import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from "./notification-item.component";

describe('NotificationItem', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<NotificationItem debug />);
  
    expect(component).toMatchSnapshot();
  });
});
