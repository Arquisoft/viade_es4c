import React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "./App";

it("App renders without crashing", () => {
  afterAll(cleanup);
  const { container } = render(<App />);
  expect(container).toBeTruthy();
});
