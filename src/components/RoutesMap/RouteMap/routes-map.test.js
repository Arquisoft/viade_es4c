import {cleanup, render} from "react-testing-library";
import React from "react";
import RouteMap from "./index";
import {ItemViade, RouteViade} from "../../../viade";

describe.only("RouteMapComponent", () => {
	afterAll(cleanup);

	jest.mock("leaflet");

	const mockRoute = new RouteViade("Test", [
		new ItemViade(1.0, 1.0, 1),
		new ItemViade(1.1, 1.1, 2),
		new ItemViade(1.2, 1.2, 3),
		new ItemViade(1.3, 1.3, 4)
	]);

	const {container} = render(
		<RouteMap route={mockRoute}/>
	);

	test("renders without crashing", () => {
		expect(container).toBeTruthy();
	});

});