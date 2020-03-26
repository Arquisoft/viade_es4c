import React from 'react';
import { render, cleanup } from '@testing-library/react';
import RoutesUploader from './routes-uploader.component';

afterAll(cleanup);

const { container } = render(<RoutesUploader />);

describe('RoutesUploader', () => {
  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});