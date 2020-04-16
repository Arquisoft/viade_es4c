import React, {useState} from "react";
import {NotificationTypes} from "@inrupt/solid-react-components";
import {notificationHelper} from "../../../viade";
import {List, LoggedIn} from "@solid/react";
import {FriendCard} from "../../index";
import {successToaster} from "../../../utils";

const ShareFormComponent = ({
								webId,
								friend,
								sendNotification,
								routeURL
	}) => {

	let [sentTo, setSentTo] = useState([]);

	const shareWith = (target) => {
        friend = target;
        shareRoute();
    };

	const shareRoute = async () => {
		const licenseUrl = "https://creativecommons.org/licenses/by-sa/4.0/";
		const inboxes = await notificationHelper.findUserInboxes([
			{path: friend, name: "Global"}
		]);

		const to = inboxes[0];
		const target = friend;
		setSentTo([...sentTo, friend]);
		successToaster("The route was shared successfully");

		await sendNotification(
			{
				title: "Route share",
				summary: "has shared you a route.",
				actor: webId,
				object: routeURL,
				target
			},
			to.path,
			NotificationTypes.OFFER,
			licenseUrl
		);
	};

	return (
		<form className={"list-holder"} style={{width: "750px"}}>
			<h1>Share with</h1>
			<LoggedIn>
				<List src="user.friends">
					{(friend) => sentTo.includes(`${friend}`) ? null
						:	<FriendCard key={`${friend}`} friend={`${friend}`}
										enable={false} onClick={() => shareWith(`${friend}`)}/>}
				</List>
			</LoggedIn>
		</form>
	);
};

export default ShareFormComponent;
