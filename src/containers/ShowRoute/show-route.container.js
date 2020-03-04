import React from "react";
import {RouteMap, RouteUploader} from "../../components";
import "./show-route.css"

/**
 * Home component that returns the homepage
 */
export const ShowRoute = () => {
	return (
		<div className="grid-container">
			<RouteMap className="route-map"/>
			<RouteUploader/>
			<div className="itinerary">p</div>
			<div className="img-carousel">p</div>
			<div className="video-lister">p</div>
		</div>
	);
};