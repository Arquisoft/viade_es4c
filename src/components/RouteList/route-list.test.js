import {cleanup, render} from "react-testing-library";
import React from "react";
import RouteList from "./index";

describe.only("RouteListComponent", () => {
	afterAll(cleanup);

	const mockReadRoutes = () => {
		return [
			"http://thiswillfail.com",
			"http://thiswillfail.com",
			"http://thiswillfail.com"
		];
	};

	const {container} = render(
		<RouteList	readRoutes={mockReadRoutes}
					webId={"https://viadees4c.solid.community/profile/card#me"} share={"my"}/>
	);

	test("renders without crashing", () => {
		expect(container).toBeTruthy();
	});

});