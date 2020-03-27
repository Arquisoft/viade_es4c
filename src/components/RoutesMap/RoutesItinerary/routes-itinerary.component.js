import React from "react";
import Card from "react-bootstrap/Card";

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
				<h2>Points:</h2>
				{this.data.map(function (object) {
					return <Card key={object.latitude + object.longitude}>
						<p className="coordinate">{object.latitude}, {object.longitude}</p>
					</Card>
				})};
			</div>
		);
	}

}

export default RoutesItinerary;