import {cleanup, render} from "react-testing-library";
import React from "react";
import RouteItem from "./index";

describe.only("RouteItemComponent", () => {
	afterAll(cleanup);

	const {container} = render(
		<RouteItem url={"http://thiswillfail.com"} share={"my"}/>
	);

	test("renders without crashing", () => {
		expect(container).toBeTruthy();
	});
});