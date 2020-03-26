
// Imports

/* eslint-disable no-console */
import React from "react";
import { render, cleanup } from "@testing-library/react";
import ErrorBoundary from "./error-boundary.component";

//Arrange
const ErrorComponent = () => {
  throw Error("Error");
};

// This a hack to avoid error console when we run test
const shallowErrors = (codeRun) => {
  const { error } = console;

  console.error = () => {};

  codeRun();

  console.error = error;
};

afterAll(cleanup);

//Act
describe("ErrorBoundary Component", () => {
  test("caches error and display messages", () => {
    shallowErrors(() => {

        // Render
      const { container } = render(
        <ErrorBoundary component={() => <h2>Error Message</h2>}>
          <ErrorComponent />
        </ErrorBoundary>
      );

      //Assert
      expect(container).toHaveTextContent("Something went wrong");
    });
  });
});
