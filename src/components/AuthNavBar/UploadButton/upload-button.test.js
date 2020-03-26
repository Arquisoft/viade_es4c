import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UploadButton from './upload-button.component';

describe.only('UploadButton', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <UploadButton t={key => key} />
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
