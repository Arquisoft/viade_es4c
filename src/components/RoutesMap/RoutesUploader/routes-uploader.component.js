import React from "react";
import "./routes-uploader.css";

const uploader = "Uploader Name";
const name = "Route name";
const date = "01/01/2077";
const description = "This is an example route featuring the best town";

/**
 * Component featuring the route information
 */
const RouteUploader = () => {
	return (
		<div className="route-uploader">
			<p className="uploader-text d-inline-block"><a className="font-weight-bold">{uploader}</a> - {name}</p>
			<p className="uploader-text float-right d-inline-block font-italic">{date}</p>
			<p className="uploader-text">{description}</p>
		</div>
	);
};

export default RouteUploader;