import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

/**
 * Element listing all the different points of interest of the route
 */
class RoutesItinerary extends React.Component {

	constructor(props) {
		super(props);
		this.data = this.props.route.items;
	}

	render() {
		return (
			<div className="itinerary">
				{this.data.map(function (object) {
					return <Card key={object.latitude}>
						<Card.Body>
							<ListGroup className="list-group-flush">
								<ListGroupItem>Latitude: {object.latitude}</ListGroupItem>
								<ListGroupItem>Longitude: {object.longitude}</ListGroupItem>
							</ListGroup>
						</Card.Body>
					</Card>
				})}
			</div>
		);
	}

}

export default RoutesItinerary;

