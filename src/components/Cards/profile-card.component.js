import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoute, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import "./cards.css";

/**
 * Cards with the notification info to display on the lists of routes
 * @param props
 * @returns {*}
 * @constructor
 */
export const ProfileCardComponent = (props) => {

	//const webId = props.user;

	return (
		<div className={"route-card"}>
			{/* Left side of the card, contains the image and hidden fields */}
			{/* CONVERTIR EN LINK AL POD LA TARJETA */}
			<div className="route-card-left profile-card-left">
				{props.image}
				{/* Hidden fields, we should the same as visible and the a spn the mark it is a link */}
				<div className="route-card-extra">
					<h1>{props.name}</h1>
					<div className="stats">
						{/* CONVERTIR EN LINKS LOS DIV */}
						<div>
							<FontAwesomeIcon icon={faRoute} />
							<div className="title">My Routes</div>
							<div className="value">2</div>
						</div>
						<div>
							<FontAwesomeIcon icon={faUserFriends} />
							<div className="title">Friend Routes</div>
							<div className="value">27</div>
						</div>
					</div>
				</div>
			</div>
			{/* Right side of the card, with the visible info */}
			<div className={"route-card-right"}>
				<h1>{props.name}</h1>
				<p className="profile-card-webid">{props.user}</p>
				{/* Maybe putting a non clickable link is not a good idea*/}
			</div>
		</div>
	);
};