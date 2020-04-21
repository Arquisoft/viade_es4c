import React from 'react';
import {cleanup, render} from 'react-testing-library';
import {HashRouter as Router} from 'react-router-dom';
import NotificationList from './notifications-list.component';

describe.only('NotificationList', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <NotificationList t={key => key} />
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});