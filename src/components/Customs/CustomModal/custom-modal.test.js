import React from "react";
import {
	cleanup,
	waitForElement,
	render,
	fireEvent,
	getByTestId,
	getByText
} from "react-testing-library";
import {CustomModal} from "../index";

describe.only("CustomModal", () => {
	afterAll(cleanup);

	const {container} = render(
		<CustomModal text={"TestButton"} component={<h1 data-testid="h1test">Test</h1>}/>
	);

	test("renders without crashing", () => {
		expect(container).toBeTruthy();
	});

	test("opens modal", () => {
		const button = getByText(container,"TestButton");
		fireEvent.click(button);
		waitForElement(() => {
			expect(getByTestId(container, "h1test")).not.toBeNull();
		});
	});

	test("closes modal", () => {
		const button = getByText(container,"TestButton");
		fireEvent.click(button);
		waitForElement(() => {
			fireEvent.click(getByTestId(container, "h1test"));
			var event = new KeyboardEvent("keydown", {"key": "Escape"});
			document.dispatchEvent(event);
		});
	});

});