import React from "react";
import {
	cleanup,
	render,
	fireEvent,
	getByText,
	waitForElement
} from "react-testing-library";
import {
	FriendCardComponent,
	NotificationCardComponent,
	ProfileCardComponent,
	RouteCardComponent
} from "./index";
import {HashRouter} from "react-router-dom";


describe.only("FriendCardComponent", () => {
	afterAll(cleanup);

	const {container} = render(
		<FriendCardComponent friend={"https://viadees4c.solid.community/profile/card#me"}/>
	);

	test("renders without crashing", () => {
		expect(container).toBeTruthy();
	});

});

describe.only("NotificationCardComponent returning true", () => {
	afterAll(cleanup);

	const {container} = render(
		<NotificationCardComponent	name="Test" user={"https://viadees4c.solid.community/profile/card#me"}
									disabled={false} read={false}
									condition={async () => {return true;}}
								  	action={async () => {}}/>
	);

	test("renders without crashing", () => {
		expect(container).toBeTruthy();
	});

	test("accept it and return true on condition", () => {
		let { getByTestId } = render(
			<NotificationCardComponent	name="Test" user={"https://viadees4c.solid.community/profile/card#me"}
									  	disabled={false} read={false}
										condition={async () => {return true;}}
										action={async () => {}}/>
		);
		fireEvent.mouseOver(getByTestId("noticard"));
		waitForElement(() => {
			const button = getByTestId("notibtn");
			fireEvent.click(button);
			waitForElement(() => {
				expect(getByText("Accepted")).not.toBeNull();
			});
		});
	});

});

describe.only("NotificationCardComponent returning false", () => {
	afterAll(cleanup);

	let {container} = render(
		<NotificationCardComponent name="Test" user={"https://viadees4c.solid.community/profile/card#me"}
								   disabled={false} read={false}
								   condition={async () => {return false;}}
								   action={async () => {}}/>
	);

	test("renders without crashing", () => {
		expect(container).toBeTruthy();
	});

	test("accept it and return false on condition", () => {
		let { getByTestId } = render(
			<NotificationCardComponent	name="Test" user={"https://viadees4c.solid.community/profile/card#me"}
										disabled={false} read={false}
										condition={async () => {return false;}}
										action={async () => {}}/>
		);
		fireEvent.mouseOver(getByTestId("noticard"));
		waitForElement(() => {
			const button = getByTestId("notibtn");
			fireEvent.click(button);
			waitForElement(() => {
				expect(getByText("Accepted")).not.toBeNull();
			});
		});
	});

});

describe.only("ProfileCardComponent", () => {
	afterAll(cleanup);

	const {container} = render(
		<HashRouter>
			<ProfileCardComponent	name={"Test"} webId={"https://viadees4c.solid.community/profile/card#me"}
									nMyRoutes={() => {return 3;}} nFriendsRoutes={() => {return 3;}}
									image={<img src={process.env.PUBLIC_URL + "/img/cards/profile.png"} alt={"a"}/>}/>
		</HashRouter>
	);

	test("renders without crashing", () => {
		expect(container).toBeTruthy();
	});

});

describe.only("RouteCardComponent", () => {
	afterAll(cleanup);

	const {container} = render(
		<RouteCardComponent name={"Test"} desc={"TestDesc"}/>
	);

	test("renders without crashing", () => {
		expect(container).toBeTruthy();
	});

});