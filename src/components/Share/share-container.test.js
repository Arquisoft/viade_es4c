import React from 'react';
import {cleanup, render} from 'react-testing-library';
import Share from './share.container';

describe.only('Share', () => {
  afterAll(cleanup);

  const { container } = render(
      <Share/>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
