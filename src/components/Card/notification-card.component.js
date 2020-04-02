import React, {useState} from "react";
import {Image} from "react-bootstrap";
import {CustomButton} from "../index";
import "./cards.css";

/**
 * Card with the notification info to display on the lists of routes
 * @param props
 * @returns {*}
 * @constructor
 */
export const NotificationCardComponent = (props) => {

	let [isAccepted, setAccepted] = useState(props.read);

	let accept = () => {
		props.action();
		setAccepted(!isAccepted);
	};

	return (
		<div className={"route-card " + (isAccepted ? "already-accepted" : "")}>
			{/* Left side of the card, contains the image and hidden fields */}
			<div className="route-card-left">
				<Image src={process.env.PUBLIC_URL + "/img/cards/notification.png"} alt={"Notification"}
					className="route-card-image"/>
				{/* Hidden fields, we should the same as visible and the a spn the mark it is a link */}
				<div className="route-card-extra">
					<h4>{props.name}</h4>
					<p className="route-card-p">{props.user}</p>
					{isAccepted ?
						<div className="route-card-link"> Accepted </div> :
						<div>
							<CustomButton onClick={accept} disabled={props.disabled} text="Accept"
								className="route-card-button"/>
						</div>
					}
				</div>
			</div>
			{/* Right side of the card, with the visible info */}
			<div className={"route-card-right"}>
				<h4>{props.name}</h4>
				<p className="route-card-p">{props.user}</p>
				{isAccepted ?
					<div className="route-card-link"> Accepted </div> :
					<div className="route-card-link"> Pending </div>
				}
			</div>
		</div>
	);
};