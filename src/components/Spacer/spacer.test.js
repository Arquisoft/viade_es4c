import React from "react";
import { render, cleanup } from "@testing-library/react";
import Spacer from "./spacer.component";

afterAll(cleanup);

const { container } = render(<Spacer />);

describe("Spacer", () => {
  it("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});