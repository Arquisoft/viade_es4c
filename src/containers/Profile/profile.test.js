import React from 'react';
import {cleanup, render} from 'react-testing-library';
import ProfileComponent from './index';

describe.only('ProfileComponent', () => {
  afterAll(cleanup);

  const { container } = render(
      <ProfileComponent/>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
