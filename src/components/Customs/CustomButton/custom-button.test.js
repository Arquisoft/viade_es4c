import React from "react";
import {
	cleanup,
	render
} from "react-testing-library";
import {CustomButton} from "../index";

describe.only("CustomModal", () => {
	afterAll(cleanup);

	const {container} = render(
		<CustomButton text={"Test"}/>
	);

	test("renders without crashing", () => {
		expect(container).toBeTruthy();
	});

});