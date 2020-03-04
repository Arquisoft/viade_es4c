import React from "react";
import {
	RouteMap,
	RouteUploader,
	RoutesCarousel,
	RoutesVideosComponent,
	RoutesItinerary,
	Spacer} from "../../components";
import "./show-route.css"

/**
 * Home component that returns the homepage
 */
export const ShowRoute = () => {
	return (
		<div className="grid-container">
			<RouteMap className="route-map"/>
			<RouteUploader/>
			<RoutesItinerary/>
			<div className="image-slide"><RoutesCarousel/></div>
			<div className="video-lister"><RoutesVideosComponent/></div>
			<Spacer/>
		</div>
	);
};