import React from "react";
import {cleanup, render} from "react-testing-library";
import {HashRouter as Router} from "react-router-dom";
import Notification from "./notifications.component";

describe.only("Notification", () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <Notification t={key => key} />
    </Router>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});