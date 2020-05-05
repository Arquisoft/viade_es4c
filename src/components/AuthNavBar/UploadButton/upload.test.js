import React from "react";
import {
    cleanup,
    waitForElement,
    render,
    fireEvent,
    queryByText,
    queryByTestId,
    getByTestId,
    within,
    getByText
} from "react-testing-library";
import UploadComponent from "./index";

let rendered = null;

describe.only("UploadComponent", () => {
  afterAll(cleanup);

  const { container } = render(
      <UploadComponent/>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("no name filled and clicking upload", () => {
    waitForElement(() => {
      global.open = jest.fn();
      fireEvent.click(queryByText(rendered, "Upload"));
      expect(queryByText(rendered, "Warn")).not.toBeNull();
    });
  });

  test("name filled and clicking upload", () => {
    waitForElement(() => {
      global.open = jest.fn();
      const nameInput = queryByTestId(rendered, "formName");
      nameInput.value = "Test";
      expect(nameInput.value).toBe("Test");
      fireEvent.click(queryByText(rendered, "Upload"));
      expect(queryByText(rendered, "Warn")).not.toBeNull();
    });
  });

  test("name and description filled and clicking upload", () => {
    waitForElement(() => {
      global.open = jest.fn();
      const nameInput = queryByTestId(rendered, "formName");
      nameInput.value = "Test";
      expect(nameInput.value).toBe("Test");
      const descInput = queryByTestId(rendered, "formDescription");
      descInput.value = "TestDesc";
      expect(descInput.value).toBe("TestDesc");
      fireEvent.click(queryByText(rendered, "Upload"));
      expect(queryByText(rendered, "Warn")).not.toBeNull();
    });
  });

  test("name filled and description filled, file uploaded, clicking upload", () => {
    const { getByTestId } = render(<UploadComponent />);
    const inputRoute = getByTestId("input");

    const file = new File(["..."], "test.geojson", {
      type: "application/json"
    });


    Object.defineProperty(inputRoute, "files", {
      value: [file]
    });

    fireEvent.change(inputRoute);

    getByTestId("formName").click();
    const inputName = getByTestId("formName");
    inputName.innerText = "Test";

    getByTestId("formDescription").click();
    const inputDesc = getByTestId("formDescription");
    inputDesc.innerText = "Test";

    const uploadbutton = getByText(container, "Upload");
    console.log(uploadbutton);
    uploadbutton.click();
  });



});