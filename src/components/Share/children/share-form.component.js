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
		setSentTo([...sentTo, target]);

		if (target.includes("profile/card#me")){
			friend = target;
		} else {
			friend = target.concat("profile/card#me");
		}

        shareRoute();
    };

	const shareRoute = async () => {

		const licenseUrl = "https://creativecommons.org/licenses/by-sa/4.0/";
		const inboxes = await notificationHelper.findUserInboxes([
			{path: friend, name: "Global"}
		]);

		const to = inboxes[0];
		const target = friend;

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

		successToaster("The route was shared successfully");
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
