import React from "react";
import {cleanup, render} from "react-testing-library";
import LoginComponent from "./index";

describe.only("LoginComponent", () => {
  afterAll(cleanup);

  const { container } = render(
      <LoginComponent/>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});