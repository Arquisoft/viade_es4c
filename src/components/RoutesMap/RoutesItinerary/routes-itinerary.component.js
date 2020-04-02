import React, {useState} from "react";
import {Collapse} from "react-bootstrap";
import "./routes-itinerary.css";
import {CustomButton} from "../../";

/**
 * Element listing all the different points of interest of the route
 */
const RoutesItinerary = (props) => {

	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<CustomButton onClick={toggle} text="Points" className="dropdown-toggle w-100"/>
			<Collapse in={isOpen}>
				<div>
					{props.route.items.map(function (object) {
						return <div key={object.latitude + object.longitude} className="coordinate">
							{object.latitude}, {object.longitude}
						</div>;
					})};
				</div>
			</Collapse>
		</div>
	);

};

export default RoutesItinerary;