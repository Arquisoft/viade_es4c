import React from "react";
import {cleanup, render} from "react-testing-library";
import {HashRouter as Router} from "react-router-dom";
import Home from "./home.container";

describe.only("Home", () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <Home t={key => key} />
    </Router>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});