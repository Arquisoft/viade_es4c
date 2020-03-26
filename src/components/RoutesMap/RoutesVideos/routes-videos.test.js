import React from 'react';
import { render, cleanup } from '@testing-library/react';
import RoutesVideos from './routes-videos.component';

afterAll(cleanup);

const { container } = render(<RoutesVideos />);

describe('RoutesVideos', () => {
  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});