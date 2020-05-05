import React, {useState} from "react";
import {Collapse} from "react-bootstrap";
import "./routes-itinerary.css";
import {CustomButton} from "../../";

/**
 * Element listing all the points of the app, it is a collapsible
 * @param props
 * 			route, holding the points to display
 * @returns {*}
 * @constructor
 */
const RoutesItinerary = (props) => {

	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			{/* Button to open and close the collapsible */}
			<CustomButton onClick={toggle} text="Points" className="dropdown-toggle w-100"/>
			<Collapse in={isOpen}>
				<div>
					{/* List of points (latitude and longitude) */}
					{props.route.items.map(function (object) {
						return <div key={object.latitude + object.longitude} className="coordinate">
							{object.latitude}, {object.longitude}
						</div>;
					})}
				</div>
			</Collapse>
		</div>
	);

};

export default RoutesItinerary;