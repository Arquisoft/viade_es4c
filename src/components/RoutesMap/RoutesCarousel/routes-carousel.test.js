import {cleanup, render} from "react-testing-library";
import React from "react";
import {RoutesCarousel} from "../index";
import {ImageViade} from "../../../viade";

describe.only("RoutesCarouselComponent", () => {
	afterAll(cleanup);

	function noOp () { }
	if (typeof window.URL.createObjectURL === "undefined") {
		Object.defineProperty(window.URL, "createObjectURL", { value: noOp});
	}

	const type = "image/png";

	const mockMedia = [
		new ImageViade("", "", Date.now(), new Blob(["a".repeat(1024)], { type })),
		new ImageViade("", "", Date.now(), new Blob(["b".repeat(1024)], { type })),
		new ImageViade("", "", Date.now(), new Blob(["c".repeat(1024)], { type }))
	];

	const {container} = render(
		<RoutesCarousel media={mockMedia}/>
	);

	test("renders without crashing", () => {
		expect(container).toBeTruthy();
	});

});