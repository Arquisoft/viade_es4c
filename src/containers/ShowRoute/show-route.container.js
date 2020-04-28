import React, {Component} from "react";
import {Loader, RouteMap, RoutesCarousel, RoutesItinerary, RouteTitle, Spacer,} from "../../components";
import {Col, Row} from "react-bootstrap";
import "./show-route.css";
import {RDFToRoute} from "../../viade";
import { Redirect } from "react-router-dom";

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
		this.linkRuta = decodeURIComponent(props.match.params.uri);
		this.state = {promiseIsResolved: false};
		this.route = this.getRoute();
		this.webId = props.webId;
	}

	async getRoute() {
		let promise = RDFToRoute.parse(this.linkRuta);
		return await promise.then((res) => {
			this.route = res;
			this.setState({promiseIsResolved: true});
		});
	}

	render() {
		return (
			(this.state.promiseIsResolved) ?
				((this.route)?<div>    {/* Shows the map and info when it finishes loading the Route */}
					<Row>
						<Col xs={12} md={2}/>
						<Col xs={12} md={8} className="route-container">
							{/* Name, description and share button */}
							<RouteTitle route={this.route} share={this.props.match.params.share === "my"}
										routeURL={this.linkRuta} webId={this.webId}/>
							<RouteMap route={this.route}/> 					{/* Map and route */}
						</Col>
						<Col xs={12} md={2}/>
					</Row>
					<Row>
						<Col xs={12} md={2}/>
						<Col xs={12} md={6}>
							{/* Images of the route */}
							{(this.route.media.length !== 0) ?
								<div className="image-slide"><RoutesCarousel media={this.route.media}/></div> : null}
						</Col>
						<Col xs={12} md={2}>
							<RoutesItinerary route={this.route}/> {/* List of points of the route */}
						</Col>
						<Col xs={12} md={2}/>
					</Row>
				</div>:<Redirect to="/404" />
				): <div>
					<Spacer/>
					<Loader size="150px"/>
				</div>
		);
	}
}
