import React from "react";
import {cleanup, render} from "react-testing-library";
import {HashRouter as Router} from "react-router-dom";
import AuthNavBar from "./auth-nav-bar.component";

describe.only("AuthNavBar", () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <AuthNavBar t={key => key} />
    </Router>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("logout", () => {
    const { getByTestId } = render(<Router><AuthNavBar /></Router>);
    const inputRoute = getByTestId("logoutbtn");
    inputRoute.click();
  });

});