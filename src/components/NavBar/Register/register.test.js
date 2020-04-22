import React from "react";
import {cleanup, render} from "react-testing-library";
import RegisterContainer from "./index";

describe.only("RegisterContainer", () => {
  afterAll(cleanup);

  const { container } = render(
      <RegisterContainer/>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});