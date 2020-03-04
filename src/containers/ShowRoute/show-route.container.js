import React from "react";
import {RouteMap, RouteUploader, RoutesCarousel, Spacer} from "../../components";
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
			<RoutesCarousel className="img-carousel"/>
			<div className="video-lister">p</div>
			<Spacer/>
		</div>
	);
};