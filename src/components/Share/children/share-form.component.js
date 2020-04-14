import React from "react";
import {NotificationTypes} from "@inrupt/solid-react-components";
import {notificationHelper} from "../../../viade";
import {List, LoggedIn} from "@solid/react";
import {FriendCard} from "../../index";

const ShareFormComponent = ({
								webId,
								friend,
								sendNotification,
								routeURL
	}) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		shareRoute();
	};

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
		<form className={"list-holder"} onSubmit={handleSubmit} style={{width: "750px"}}>
			<h1>Share with</h1>
			<LoggedIn>
				<List src="user.friends">
					{(friend) => <FriendCard key={`${friend}`} friend={`${friend}`}
											enable={false} onClick={() => shareWith(`${friend}`)}/>}
				</List>
			</LoggedIn>
		</form>
	);
};

export default ShareFormComponent;
