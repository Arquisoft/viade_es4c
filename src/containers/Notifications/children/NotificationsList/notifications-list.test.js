import React from 'react';
import { shallow } from 'enzyme';
import NotificationList from "./notifications-list.component";

describe('NotificationList', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<NotificationList debug />);
  
    expect(component).toMatchSnapshot();
  });
});
