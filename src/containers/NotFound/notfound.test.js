import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NotFoundComponent from "./notfound.component";

afterAll(cleanup);

const { container } = render(
<Router>
  <NotFoundComponent />
</Router>);

describe("NotFound", () => {
  it("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});
