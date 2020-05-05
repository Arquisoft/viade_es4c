import React, {useState} from "react";
import {ShareFormComponent} from "./children";
import {useNotification,withWebId} from "@inrupt/solid-react-components";
import { permissionHelper,errorToaster } from "../../utils";

/**
 * Share component to open when loaded the modal
 * @param props
 * 			webId, webId of the current user
 * 			route, route to share
 * @returns {*}
 * @constructor
 */
const ShareComponent = (props) => {
	const [friend] = useState("");
	const {webId, route} = props;
	const {createNotification} = useNotification(webId);

	/**
	 * Sends the notification to the specified user
	 * @param content				Content to share
	 * @param to					Objective of the notification
	 * @param type					Type of the sharing
	 * @param license				License of sharing
	 * @returns {Promise<void>}
	 */
	const sendNotification = async (content, to, type, license) => {
		try {
			await permissionHelper.setReadPermissionRoute(content.actor,content.target,route);
			await createNotification(content, to, type, license);
		} catch(error) {
			errorToaster("An error has occurred creating the notification");
		}
	};

	return (
		<div>
			<ShareFormComponent {...{
				webId,
				friend,
				sendNotification,
				route
			}} />
		</div>
	);

};

export default withWebId(ShareComponent);
