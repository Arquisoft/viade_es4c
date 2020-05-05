import React, {useState} from "react";
import {Image} from "react-bootstrap";
import {CustomButton} from "../index";
import {errorToaster, successToaster, infoToaster} from "../../utils";
import "./cards.css";

/**
 * Cards with the notification info to display on the lists of routes
 * @param props
 * 			action, holding the action to do (accept the notification)
 * 			read, if the notifications is already accepted or not
 * 			disabled, state of the accept button
 * @returns {*}
 * @constructor
 */
export const NotificationCardComponent = (props) => {

	// Status to reload or set the card if the it's accepted
	let [isAccepted, setAccepted] = useState(props.read);

	/**
	 * Async call to the accept action and set the status change, if successful or not throws a toaster
	 */
	let accept = async () => {
		try {
			if(await props.condition()){
				let read = await props.action();
				setAccepted(read === true);
				successToaster("The route has been accepted");
			}else{
				infoToaster(props.message);
			}
		} catch (err) {
			errorToaster(err.message, err.name);
		}
	};

	return (
		<div className={"route-card " + (isAccepted ? "already-accepted" : "")}>
			{/* Left side of the card, contains the image and hidden fields */}
			<div className="route-card-left">
				<Image src={process.env.PUBLIC_URL + "/img/cards/notification.png"} alt={"Notification"}
					className="route-card-image"/>
				{/* Hidden fields, same as the visible with the accept button in case it is pending */}
				<div className="route-card-extra">
					<h4>{props.name}</h4>
					<p className="route-card-p">{props.user}</p>
					{/* Accepted label or button to accept based on the status of notification */}
					{isAccepted
						? <div className="route-card-link"> Accepted </div>
						: <div>
							<CustomButton onClick={accept} disabled={props.disabled} text="Accept"
										className="route-card-button"/>
						</div>
					}
				</div>
			</div>
			{/* Right side of the card, with the visible info */}
			<div className={"route-card-right notification-card-right"}>
				<h4>{props.name}</h4>
				<p className="route-card-p">{props.user}</p>
				{/* Status of the notification */}
				{(isAccepted)
					? <div className="route-card-link"> Accepted </div>
					: <div className="route-card-link"> Pending </div>
				}
			</div>
		</div>
	);
};