import React from 'react';
import {cleanup, render} from 'react-testing-library';
import Spacer from './index';

describe.only('Spacer', () => {
  afterAll(cleanup);

  const { container } = render(
      <Spacer/>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
