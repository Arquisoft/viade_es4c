import React, {useState, useCallback} from "react";
import {ShareFormComponent} from "./children";
import {useNotification,withWebId} from "@inrupt/solid-react-components";
import { permissionHelper } from "../../utils";

const ShareComponent = (props) => {
	const [friend, setFriend] = useState("");
	const [route, setRoute] = useState("");
	const {webId} = props;
	const {createNotification} = useNotification(webId);

	const sendNotification = useCallback(
		async (content, to, type, license) => {
			try {
				createNotification(content, to, type, license);
				permissionHelper.setPermissions(content.actor,content.target,content.object,["R"]);
			} catch (error) {
				console.error(error);
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
				setFriend,
				route,
				setRoute,
				sendNotification
			}} />
		</div>
	);

};

export default withWebId(ShareComponent);
