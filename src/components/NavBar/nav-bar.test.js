import React from "react";
import {cleanup, render} from "react-testing-library";
import {HashRouter as Router} from "react-router-dom";
import NavBar from "./nav-bar.component";

describe.only("NavBar", () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <NavBar t={key => key} />
    </Router>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});