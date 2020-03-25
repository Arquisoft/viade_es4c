import React, {Component} from "react";
import {
	RouteMap,
	RoutesCarousel,
	RoutesItinerary,
	RoutesVideosComponent,
	RouteUploader,
	Spacer
} from "../../components";
import "./show-route.css"

/**
 * Page which prints a Route and all its info
 */
export class ShowRoute extends Component {

	/**
	 * The page receives a route through the state
	 * @param props	Containing the route to display
	 */
	constructor(props) {
		super(props);
		this.route = this.props.location.state.route;
	}

	render() {
		return (
			<div className="grid-container">
				<RouteMap route={this.route} className="route-map"/>				{/* Map */}
				<RouteUploader route={this.route}/>									{/* Basic route info */}
				<RoutesItinerary route={this.route}/>								{/* List of points of the route */}
				{/* Images of the route */}
				{this.route.images? <div className="image-slide"><RoutesCarousel/></div> : <div></div>}
				{/* Videos of the route */}
				{this.route.videos? <div className="video-lister"><RoutesVideosComponent/></div> : <div></div>}
				<Spacer/>
			</div>
		);
	};
}