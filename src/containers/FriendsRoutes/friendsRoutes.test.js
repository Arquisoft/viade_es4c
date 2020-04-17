import React from 'react';
import { shallow } from 'enzyme';
import FriendsRoutes from "./friendsRoutes.container";

describe('FriendsRoutes', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<FriendsRoutes debug />);
  
    expect(component).toMatchSnapshot();
  });
});
