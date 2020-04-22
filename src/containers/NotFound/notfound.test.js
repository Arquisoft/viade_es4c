import React from 'react';
import {cleanup, render} from 'react-testing-library';
import {HashRouter as Router} from 'react-router-dom';
import NotFoundComponent from './index';

describe.only('NotFoundComponent', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <NotFoundComponent/>
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
