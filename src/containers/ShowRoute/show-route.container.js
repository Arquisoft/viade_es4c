import React, {Component} from "react";
import {
	RouteMap,
	RoutesCarousel,
	RoutesItinerary,
	RouteTitle,
} from "../../components";
import {Col, Row} from "react-bootstrap";
import "./show-route.css";
import {RDFToRoute} from "../../viade";

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
		this.linkRuta = props.location.state.route;
		let xd = this.getRoute();
		this.state = {
			route: xd
		}
		console.log(xd)
	}	
	
	
	async componentWillMount(){
		let promise = RDFToRoute.parse(this.linkRuta);
		let aux = await promise.then((result)=>result);
		this.setState({route: aux});
	}
	
	
	async getRoute(){
		let promise = RDFToRoute.parse(this.linkRuta);
		let aux = await promise.then((result)=>result);
		return aux;
	}

	/*
	static getDerivedStateFromProps(nextProps, prevState) {
		let aux = this.getRoute();
		return {
		  route: aux
		};
	}
	*/
	

	render() {
		return (
			<div>
				<Row>
					{console.log(this.state.route)}
					<Col xs={12} md={2}/>
					<Col xs={12} md={8} className="route-container">
						<RouteTitle route={this.state.route}/> {/* Basic route info */}
						<RouteMap route={this.state.route}/> {/* Map */}
					</Col>
					<Col xs={12} md={2}/>
				</Row>
				<Row>
					<Col xs={12} md={2}/>
					<Col xs={12} md={6}>
						{/* Images of the route */}
						<div className="image-slide"><RoutesCarousel/></div>
						{(this.state.route.media.length !== 0) ? <div className="image-slide"><RoutesCarousel/></div> : null}
					</Col>
					<Col xs={12} md={2}>
						<RoutesItinerary route={this.state.route}/> {/* List of points of the route */}
					</Col>
					<Col xs={12} md={2}/>
				</Row>
			</div>
		);
	}
}