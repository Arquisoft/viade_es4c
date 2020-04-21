import React from "react";
import "./cards.css";

/**
 * Cards with the friends names and their WebIds
 * @param props
 * @returns {*}
 * @constructor
 */
export const FriendCardComponent = (props) => {

	return (
		<div className={"route-card friend-card"} onClick={props.onClick}>
			{/* Left side of the card, contains the image and hidden fields */}
			<div className="route-card-left friend-card-left">
				{/* Hidden fields, we should the same as visible and the a spn the mark it is a link */}
				<div className="route-card-extra friend-card-extra">
					<h3>
						{props.enable
							? <a href={props.friend}>{props.friend}</a>
							: props.friend}
					</h3>
				</div>
			</div>
			{/* Right side of the card, with the visible info */}
			<div className={"route-card-right friend-card-right"}>
				<h3>{props.friend.split(".")[0].substring(8, props.friend.split(".")[0].length)}</h3>
			</div>
		</div>
	);
};