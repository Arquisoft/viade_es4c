import React, {useState, useCallback} from "react";
import {ShareFormComponent} from "./children";
import {useNotification} from "@inrupt/solid-react-components";

const ShareComponent = (props) => {
	const [friend] = useState("");
	const {webId, routeURL} = props;
	const {createNotification} = useNotification(webId);

	const sendNotification = useCallback(
		async (content, to, type, license) => {
			try {
				await createNotification(content, to, type, license);
			} catch (error) {
				alert("Error: ShareComponent > sendNotification");
			}
		},
		[createNotification]
	);

	return (
		<div>
			<ShareFormComponent {...{
				webId,
				friend,
				sendNotification,
				routeURL
			}} />
		</div>
	);

};

export default ShareComponent;
