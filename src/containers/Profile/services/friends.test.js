import {addFriend} from "./friends.service";

describe("Profile", () => {

	test("addfriends with invalid options", () => {
		addFriend(null, null);
	});

	test("addfriends with invalid friend", () => {
		addFriend("https://viadees4ccccc.solid.community/profile/card#me",
			"https://viadees4c.solid.community/profile/card#me");
	});
});
