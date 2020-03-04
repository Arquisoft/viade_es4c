import React from "react";
import {RouteMap, RouteUploader, RoutesCarousel, RoutesVideosComponent, Spacer} from "../../components";
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
			<div className="image-slide"><RoutesCarousel/></div>
			<div className="video-lister"><RoutesVideosComponent/></div>
			<Spacer/>
		</div>
	);
};