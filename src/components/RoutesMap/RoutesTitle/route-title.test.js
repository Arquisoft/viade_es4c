import React from "react";
import {cleanup, fireEvent, getByTestId, getByText, render, waitForDomChange} from "react-testing-library";
import RouteTitle from "./index";
import { ItemViade, RouteViade } from "../../../viade/Model";

describe.only("RouteTitle", () => {
  afterAll(cleanup);

    let item1 = new ItemViade(50,50,1);
    let item2 = new ItemViade(50,50,2);
    let item3 = new ItemViade(50,50,3);
    let items = [item1, item2, item3];

    let prueba = new RouteViade("rutaPrueba", items, "descripcion", [], []);

  const { container } = render(
      <RouteTitle route = {prueba} share={true}/>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("opens share", () => {
    const button = getByText(container,"Share");
    fireEvent.click(button);
    waitForDomChange(() => {
      expect(getByText(container, "Share with")).not.toBeNull();
    });
  });

  test("triggers edit, changes values and press Escape", () => {
    const button = getByTestId(container,"editbtn");
    fireEvent.click(button);
    waitForDomChange(() => {
      expect(getByTestId(container,"savebtn")).not.toBeNull();
      const inputName = getByTestId("inputName");
      inputName.innerText = "Test";
      expect(inputName.innerText).toBe("Test");
      const inputDesc = getByTestId("inputDesc");
      inputDesc.innerText = "Test";
      expect(inputDesc.innerText).toBe("Test");
      inputName.click();
      var event = new KeyboardEvent("keydown", {"key": "Escape"});
      document.dispatchEvent(event);
      waitForDomChange(() => {
        expect(getByTestId(container,"editbtn")).not.toBeNull();
      });
    });
  });

  test("triggers edit, changes values and press Enter", () => {
    const { getByTestId } = render(<RouteTitle route = {prueba} share={true}/>);
    const button = getByTestId("editbtn");
    fireEvent.click(button);
    waitForDomChange(() => {
      expect(getByTestId("savebtn")).not.toBeNull();
      const inputName = getByTestId("inputName");
      inputName.innerText = "Test";
      expect(inputName.innerText).toBe("Test");
      const inputDesc = getByTestId("inputDesc");
      inputDesc.innerText = "Test";
      expect(inputDesc.innerText).toBe("Test");
      inputName.click();
      var event = new KeyboardEvent("keydown", {"key": "Enter"});
      document.dispatchEvent(event);
      waitForDomChange(() => {
        expect(getByTestId("editbtn")).not.toBeNull();
      });
    });
  });

});