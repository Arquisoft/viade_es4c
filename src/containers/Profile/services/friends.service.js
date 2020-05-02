import FileClient from "solid-file-client";
import auth from "solid-auth-client";
import {errorToaster, successToaster} from "../../../utils";

const { default: data } = require('@solid/query-ldflex');

const isWebIdValid = async (friendWebId) => {
	const fc = new FileClient(auth);
	let session = await auth.currentSession();
	if (!session) { session = await auth.login(); }
	try {
		let op = async (client) => await client.itemExists(friendWebId);
		return await op(fc);
	} catch (e) {
		session = await auth.currentSession();
	}
};

const isFriend = async (friendWebId, user) => {
	for await (const friend of user.friends)
		if (String(friend).localeCompare(String(friendWebId)) === 0) return true;
	return false;
};

export const addFriend = async (friendWebId, userWebId) =>{
	if (friendWebId == null || userWebId == null || friendWebId === "" || userWebId === "")
		return;
	const user = await data[userWebId];
	isWebIdValid(friendWebId).then((res) => {
		if (!res) { errorToaster("The entered user does not exists"); }
		else {
			isFriend(friendWebId, user).then((res) => {
				if (res) { errorToaster("You and this user are already friends"); }
				else {
					user.knows.add(data[friendWebId]).then((res) => {
						if (res) {
							successToaster("Congratulations, this user is already your friend.\nReload to see the changes");
						} else { errorToaster("Sorry, some unexpected error has occurred"); }
					});
				}
			});
		}
	});
};