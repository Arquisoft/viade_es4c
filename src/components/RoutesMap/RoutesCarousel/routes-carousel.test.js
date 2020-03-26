import React from 'react';
import { render, cleanup } from '@testing-library/react';
import RoutesCarousel from './routes-carousel.component';

afterAll(cleanup);

const { container } = render(<RoutesCarousel />);

describe('RoutesCarousel', () => {
  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});