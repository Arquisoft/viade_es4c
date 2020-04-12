import React, {useState, useCallback, useEffect} from "react";
import {NotificationsList} from "./children";
import {ldflexHelper, errorToaster} from "../.././utils";
import auth from "solid-auth-client";
import FC from "solid-file-client";

const fc = new FC(auth);

const Notifications = (props) => {
	const [inboxes, setInbox] = useState([]);
	const [image, setImage] = useState([]);
	const {webId} = props;

	const discoverInbox = useCallback(async () => {
		try {
			let inboxes = [];
			/**
			 * Get user's global inbox path from pod.
			 */
			const globalInbox = await ldflexHelper.discoverInbox(webId);

			if (globalInbox) {
				inboxes = [
					...inboxes,
					{path: globalInbox, inboxName: "Global", shape: "default"}
				];
			}
			/**
			 * If user doesn't has inbox in his pod will show an error and link to
			 * know how fix it.
			 */
			if (inboxes.length === 0) {
				errorToaster("Your inbox couldn't be found", "Error");
			}
			setInbox(inboxes);
		} catch (error) {
			errorToaster("An error has occurred with the inbox folder", "Error");
		}
	}, [webId]);

	const inboxUrl = inboxes.map((item) => item.path);

	useEffect(() => {
		if (webId) {
			discoverInbox();
		}
	}, [webId, discoverInbox]);

	return (
		<div>
			<NotificationsList inboxes={inboxUrl} {...props}/>
		</div>
	);
};

export default Notifications;
