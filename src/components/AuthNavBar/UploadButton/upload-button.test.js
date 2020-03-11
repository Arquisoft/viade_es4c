import React from 'react';
import { render, cleanup } from 'react-testing-library';
import UploadButton from './upload-button.component';

afterAll(cleanup);

const { container } = render(<UploadButton t={key => key} />);

describe('UploadButton', () => {
  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
