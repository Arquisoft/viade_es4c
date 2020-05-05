import React from "react";
import {
	cleanup,
	render
} from "react-testing-library";
import {Loader} from "../index";

describe.only("CustomModal", () => {
	afterAll(cleanup);

	const {container} = render(
		<Loader/>
	);

	test("renders without crashing", () => {
		expect(container).toBeTruthy();
	});

});