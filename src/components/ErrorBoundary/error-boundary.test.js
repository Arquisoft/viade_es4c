import React from 'react';
import { shallow } from 'enzyme';
import ErrorBoudary from "./error-boundary.component";

describe('ErrorBoundary', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<ErrorBoudary debug />);
  
    expect(component).toMatchSnapshot();
  });
});
