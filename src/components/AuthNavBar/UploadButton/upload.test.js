import React from 'react';
import {cleanup, render} from 'react-testing-library';
import UploadComponent from './index';

describe.only('UploadComponent', () => {
  afterAll(cleanup);

  const { container } = render(
      <UploadComponent/>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});