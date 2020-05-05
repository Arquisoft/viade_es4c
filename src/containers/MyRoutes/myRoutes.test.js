import React from "react";
import {cleanup, render} from "react-testing-library";
import {HashRouter as Router} from "react-router-dom";
import MyRoutes from "./myRoutes.container";

describe.only("MyRoutes", () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <MyRoutes t={key => key} />
    </Router>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});