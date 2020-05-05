import React from "react";
import {
    cleanup,
    waitForElement,
    render,
    fireEvent,
    queryByTestId,
    queryByText
} from "react-testing-library";
import RegisterContainer from "./index";

let rendered = null;

describe.only("RegisterContainer", () => {
  afterAll(cleanup);

  const { container } = render(
      <RegisterContainer/>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("runs select provider", () => {
    waitForElement(() => {
      global.open = jest.fn();
      fireEvent.click(queryByTestId(rendered, "radio-solid-community"));
      fireEvent.click(queryByText(rendered, "Next"));
    });
  });

});