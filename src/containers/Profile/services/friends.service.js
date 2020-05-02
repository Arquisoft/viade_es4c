import FileClient from "solid-file-client";
import auth from "solid-auth-client";
import {errorToaster, successToaster} from "../../../utils";

const { default: data } = require('@solid/query-ldflex');

/**
 * Checks if the entered webId corresponds to a valid user
 * @param friendWebId		WebId to check
 * @returns {Promise<*>}	Promise to make the async call
 */
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

/**
 * Checks if the specified webId corresponds to an already friend user
 * @param friendWebId				WebId to check
 * @param user						Current user
 * @returns {Promise<boolean>}		Promise to make the async call
 */
const isFriend = async (friendWebId, user) => {
	for await (const friend of user.friends)
		if (String(friend).localeCompare(String(friendWebId)) === 0) return true;
	return false;
};

/**
 * Adds the friend if it is valid and not a friend, if not throws an error message
 * @param friendWebId			username of the friend (without the rest of the url of the WebId)
 * @param userWebId				current user WebId
 * @returns {Promise<void>}		promise to make the async call
 */
export const addFriend = async (friendWebId, userWebId) =>{
	// Checks the input is valid, the url is completed by us so it is not needed
	if (friendWebId == null || userWebId == null || friendWebId === "" || userWebId === "" ||
			friendWebId.includes("https://") || friendWebId.includes(".solid.community")){
		errorToaster("The entered input is not valid, check you didn't submit the whole URL WebId");
		return;
	}
	// Creates the WebId from the username
	friendWebId = "https://" + friendWebId + ".solid.community/profile/card#me";
	// Loads the current user
	const user = await data[userWebId];
	// Checks the friend exists
	isWebIdValid(friendWebId).then((res) => {
		if (!res) { errorToaster("The entered user does not exists"); }
		else {
			// Checks the friend is not already a friend
			isFriend(friendWebId, user).then((res) => {
				if (res) { errorToaster("You and this user are already friends"); }
				else {
					// Adds the friend
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