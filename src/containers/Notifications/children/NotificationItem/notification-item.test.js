import React from "react";
import {cleanup, render} from "react-testing-library";
import {HashRouter as Router} from "react-router-dom";
import NotificationItem from "./notification-item.component";

describe.only("NotificationItem", () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <NotificationItem t={key => key} />
    </Router>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});