import React from 'react';
import { render, cleanup } from '@testing-library/react';
import RoutesItinerary from './routes-itinerary.component';

afterAll(cleanup);

const { container } = render(<RoutesItinerary />);

describe('RoutesItinerary', () => {
  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});