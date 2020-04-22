import React from "react";
import {cleanup, render} from "react-testing-library";
import RouteTitle from "./index";
import { ItemViade, RouteViade } from "../../../viade/Model";

describe.only("RouteTitle", () => {
  afterAll(cleanup);

  let item1 = new ItemViade(50,50,1)
    let item2 = new ItemViade(50,50,2)
    let item3 = new ItemViade(50,50,3)
    let items = [item1, item2, item3]

    let prueba = new RouteViade("rutaPrueba", items, "descripcion", [], [])

  const { container } = render(
      <RouteTitle route = {prueba}/>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});