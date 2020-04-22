import React from 'react';
import {cleanup, render} from 'react-testing-library';
import Toaster from './index';

describe.only('Toaster', () => {
  afterAll(cleanup);

  const { container } = render(
      <Toaster/>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
