import React from 'react';
import {cleanup, render} from 'react-testing-library';
import {HashRouter as Router} from 'react-router-dom';
import FriendsRoutes from './friendsRoutes.container';

describe.only('FriendsRoutes', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <FriendsRoutes t={key => key} />
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});