import React from "react";
import {Image} from "react-bootstrap";
import "./cards.css";

/**
 * Card with the Route info to display on the lists of routes
 * @param props
 * @returns {*}
 * @constructor
 */
export const RouteCardComponent = (props) => {

	return (
		<div className="card">
			{/* Left side of the card, contains the image and hidden fields */}
			<div className="card-left">
				<Image src={process.env.PUBLIC_URL + "/img/routes/route.png"} alt={"Route"}
					className="card-image"/>
				{/* Hidden fields, we should the same as visible and the a spn the mark it is a link */}
				<div className="card-extra">
					<h3>{props.name}</h3>
					<p className="card-p">{props.desc}</p>
					<div className="card-link">
						Show
					</div>
				</div>
			</div>
			{/* Right side of the card, with the visible info */}
			<div className="card-right">
				<h3>{props.name}</h3>
				<p className="card-p">{props.desc}</p>
			</div>
		</div>
	);

};