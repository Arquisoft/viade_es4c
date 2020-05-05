import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLinkAlt, faFolderOpen, faRoute, faUserFriends} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import "./cards.css";

/**
 * Cards with the profile info
 * @param props
 * 			webId, webId of the user
 * 			image, image to display
 * 			nMyRoutes, number of own routes
 * 			nFriendsRoutes, number of friend routes
 * @returns {*}
 * @constructor
 */
export const ProfileCardComponent = (props) => {

	const {webId} = props;

	return (
		<div className={"route-card"}>
			{/* Left side of the card, contains the image and hidden fields */}
			<div className="route-card-left profile-card-left">
				{props.image}
				{/* Hidden fields, showing the info of the user */}
				<div className="route-card-extra">
					<h1>
						{props.name}
						<a href={props.webId}>
							<FontAwesomeIcon icon={faExternalLinkAlt} data-toggle="tooltip" title="My POD"/>
						</a>
					</h1>
					{/* Info stats to display */}
					<div className="stats">
						{/* Number of own routes and navigation points to them */}
						<div>
							<Link to={"/myRoutes"}>
								<FontAwesomeIcon icon={faRoute}/>
								<div className="title">My Routes</div>
								<div className="value">{props.nMyRoutes ? props.nMyRoutes : "0"}</div>
							</Link>
						</div>
						{/* Number of friend routes and navigation point to them */}
						<div>
							<Link to={"/friendsRoutes"}>
								<FontAwesomeIcon icon={faUserFriends}/>
								<div className="title">Friend Routes</div>
								<div className="value">{props.nFriendsRoutes ? props.nFriendsRoutes : "0"}</div>
							</Link>
						</div>
						{/* Navigation point to the pod */}
						<div>
							<a href={webId}>
								<FontAwesomeIcon icon={faFolderOpen}/>
								<div className="title">My POD</div>
							</a>
						</div>
					</div>
				</div>
			</div>
			{/* Right side of the card, with the visible info */}
			<div className={"route-card-right profile-card-right"}>
				<h1>{props.name}</h1>
				<p className="profile-card-webid">{props.user}</p>
			</div>
		</div>
	);
};