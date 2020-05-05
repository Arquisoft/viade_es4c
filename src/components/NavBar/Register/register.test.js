import React from "react";
import {
    cleanup,
    render,
    getByText,
    getByValue
} from "react-testing-library";
import RegisterContainer from "./index";

describe.only("RegisterContainer", () => {
  afterAll(cleanup);

  const { container } = render(
      <RegisterContainer/>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("runs select provider", () => {
      const radio = getByValue(container,"https://solid.community/register");
      radio.click();
      const next = getByText(container, "Next");
      next.click();
  });

});