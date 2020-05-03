import React from "react";
import {Image} from "react-bootstrap";
import "./cards.css";

/**
 * Cards with the Route info to display on the lists of routes
 * @param props
 * 			name, name of the route
 * 			desc, description of the route
 * @returns {*}
 * @constructor
 */
export const RouteCardComponent = (props) => {
	return (
		<div className="route-card">
			{/* Left side of the card, contains the image and hidden fields */}
			<div className="route-card-left">
				<Image src={process.env.PUBLIC_URL + "/img/cards/route.png"} alt={"Route"}
					className="route-card-image"/>
				{/* Hidden fields, same as visible with a Show indicator */}
				<div className="route-card-extra">
					<h4>{props.name}</h4>
					<p className="route-card-p">{props.desc}</p>
					<div className="route-card-link">
						Show
					</div>
				</div>
			</div>
			{/* Right side of the card, with the visible info */}
			<div className="route-card-right">
				<h4>{props.name}</h4>
				<p className="route-card-p">{props.desc}</p>
			</div>
		</div>
	);

};