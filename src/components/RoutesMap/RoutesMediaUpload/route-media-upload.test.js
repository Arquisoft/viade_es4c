import React from "react";
import {cleanup, render} from "react-testing-library";
import RoutesMediaUpload from "./routes-media-upload.component";

describe.only("RoutesItinerary", () => {
  afterAll(cleanup);

  const { container } = render(
      <RoutesMediaUpload/>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});