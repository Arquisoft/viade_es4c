import React, {useState, useCallback} from "react";
import {ShareFormComponent} from "./children";
import {useNotification,withWebId} from "@inrupt/solid-react-components";
import { errorToaster } from "../../utils";
const ShareComponent = (props) => {
	const [friend] = useState("");
	const {webId, route} = props;
	const {createNotification} = useNotification(webId);

	const sendNotification = useCallback(
		async (content, to, type, license) => {
			try{
				await createNotification(content, to, type, license);
			}catch(error){
				console.error(error);
				errorToaster("An error has occurred creating the notification");
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
				route
			}} />
		</div>
	);

};

export default withWebId(ShareComponent);
