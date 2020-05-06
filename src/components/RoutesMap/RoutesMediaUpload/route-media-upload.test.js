import React from "react";
import {
  cleanup,
  fireEvent,
  getByText,
  render,
  waitForDomChange,
  waitForElement
} from "react-testing-library";
import RoutesMediaUpload from "./routes-media-upload.component";

describe.only("RoutesMediaUpload", () => {
  afterAll(cleanup);

  const { container } = render(
      <RoutesMediaUpload route={null} webId={"https://viadees4c.solid.community/profile/card#me"}/>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("click upload without media attached", () => {
    const { getByTestId } = render(<RoutesMediaUpload
        route={null} webId={"https://viadees4c.solid.community/profile/card#me"}/>);
    const dropwdownbutton = getByTestId("drbtn");
    fireEvent.click(dropwdownbutton);
    waitForElement(() => {
      const uploadbutton = getByTestId("upbtn");
      fireEvent.click(uploadbutton);
      waitForDomChange(() => {
        expect(getByText(container, "Warn")).not.toBeNull();
      });
    });
  });

  test("click upload without media files attached", () => {
    const { getByTestId } = render(<RoutesMediaUpload
        route={null} webId={"https://viadees4c.solid.community/profile/card#me"}/>);
    const dropwdownbutton = getByTestId("drbtn");
    fireEvent.click(dropwdownbutton);
    waitForElement(() => {
      const uploadbutton = getByTestId("upbtn");
      fireEvent.click(uploadbutton);
      waitForDomChange(() => {
        expect(getByText(container, "Warn")).not.toBeNull();
      });
    });
  });

});