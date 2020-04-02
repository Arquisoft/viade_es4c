import React, {Component} from "react";
import {
	RouteMap,
	RoutesCarousel,
	RoutesItinerary,
	RouteTitle,
} from "../../components";
import {Col, Row} from "react-bootstrap";
import "./show-route.css";

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
			<div>
				<Row>
					<Col xs={12} md={2}/>
					<Col xs={12} md={8} className="route-container">
						<RouteTitle route={this.route}/> {/* Basic route info */}
						<RouteMap route={this.route}/> {/* Map */}
					</Col>
					<Col xs={12} md={2}/>
				</Row>
				<Row>
					<Col xs={12} md={2}/>
					<Col xs={12} md={6}>
						{/* Images of the route */}
						<div className="image-slide"><RoutesCarousel/></div>
						{(this.route.media.length !== 0) ? <div className="image-slide"><RoutesCarousel/></div> : null}
					</Col>
					<Col xs={12} md={2}>
						<RoutesItinerary route={this.route}/> {/* List of points of the route */}
					</Col>
					<Col xs={12} md={2}/>
				</Row>
			</div>
		);
	}
}