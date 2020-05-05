import React from "react";
import "./cards.css";

/**
 * Cards with the friends names and their WebIds
 * @param props
 * 			onClick, action to do when clicking the card
 * 			enable, sets or not the link to the friend profile
 * 			friend, friend webId
 * @returns {*}
 * @constructor
 */
export const FriendCardComponent = (props) => {

	return (
		<div className={"route-card friend-card"} onClick={props.onClick}>
			{/* Left side of the card, contains the image and hidden fields */}
			<div className="route-card-left friend-card-left">
				{/* Hidden fields, the whole webId */}
				<div className="route-card-extra friend-card-extra">
					<h3>
						{props.enable
							? <a href={props.friend}>{props.friend}</a>
							: props.friend}
					</h3>
				</div>
			</div>
			{/* Right side of the card, with the visible info, in this case, the cut username */}
			<div className={"route-card-right friend-card-right"}>
				{/* Extracts the username from the webId */}
				<h3>{props.friend.split(".")[0].substring(8, props.friend.split(".")[0].length)}</h3>
			</div>
		</div>
	);
};