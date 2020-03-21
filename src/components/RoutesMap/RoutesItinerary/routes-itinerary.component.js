import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

/**
 * Element listing all the different points of interest of the route
 */
class RoutesItinerary extends React.Component {

	data = [
		{name: "Noia", lat: "40", long: "50", description: "Description"},
		{name: "Bergondo", lat: "41", long: "51", description: "Description1"},
		{name: "Sobreviñas", lat: "42", long: "52", description: "Description2"},
		{name: "San Lois", lat: "43", long: "53", description: "Description3"},
		{name: "Piñeiro", lat: "44", long: "54", description: "Description4"},
	];

	render() {
		return (
			<div className="itinerary">
				{this.data.map(function (object) {
					return <Card>
						<Card.Body>
							<Card.Title>{object.name}</Card.Title>
							<Card.Text>
								{object.description}
							</Card.Text>
							<ListGroup className="list-group-flush">
								<ListGroupItem>Latitude: {object.lat}</ListGroupItem>
								<ListGroupItem>Longitude: {object.long}</ListGroupItem>
							</ListGroup>
						</Card.Body>
					</Card>
				})}
			</div>
		);
	}

}

export default RoutesItinerary;

