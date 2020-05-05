import React from "react";
import {
  cleanup,
  render,
  fireEvent,
  getByTestId,
  getByText,
  waitForDomChange
} from "react-testing-library";
import UploadComponent from "./index";


describe.only("UploadComponent", () => {
  afterAll(cleanup);

  const { container } = render(
      <UploadComponent/>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("no name filled and clicking upload", () => {
    const uploadbutton = getByText(container, "Upload");
    fireEvent.click(uploadbutton);
    waitForDomChange(() => {
      expect(getByText(container, "Warn")).not.toBeNull();
    });
  });

  test("name filled and clicking upload", () => {
    const inputName = getByTestId(container,"formName");
    inputName.innerText = "Test";
    expect(inputName.innerText).toBe("Test");
    const uploadbutton = getByText(container, "Upload");
    fireEvent.click(uploadbutton);
    waitForDomChange(() => {
      expect(getByText(container, "Warn")).not.toBeNull();
    });
  });

  test("name and description filled and clicking upload", () => {
    const inputName = getByTestId(container,"formName");
    inputName.innerText = "Test";
    expect(inputName.innerText).toBe("Test");
    const inputDesc = getByTestId(container,"formName");
    inputDesc.innerText = "Test";
    expect(inputDesc.innerText).toBe("Test");
    const uploadbutton = getByText(container, "Upload");
    fireEvent.click(uploadbutton);
    waitForDomChange(() => {
      expect(getByText(container, "Warn")).not.toBeNull();
    });
  });

  test("name filled and description filled, file uploaded, clicking upload, not auth", () => {
    const { getByTestId } = render(<UploadComponent />);
    const inputRoute = getByTestId("input");

    const file = new File(["..."], "test.geojson", {
      type: "application/json"
    });

    Object.defineProperty(inputRoute, "files", {
      value: [file]
    });
    fireEvent.change(inputRoute);

    const inputName = getByTestId("formName");
    inputName.innerText = "Test";
    expect(inputName.innerText).toBe("Test");

    const inputDesc = getByTestId("formDescription");
    inputDesc.innerText = "Test";
    expect(inputDesc.innerText).toBe("Test");

    const uploadbutton = getByText(container, "Upload");
    fireEvent.click(uploadbutton);
    waitForDomChange(() => {
      expect(getByText(container, "Warn")).not.toBeNull();
    });
  });




});