import React, {useState} from "react";
import {notificationHelper} from "../../../../utils";
import NotificationItem from "../NotificationItem";
import {Col, Row} from "react-bootstrap";

const NotificationsList = (props) => {
	const {inboxes} = props;
	const [notifications, setNotifications] = useState();
	const [isSharing, setSharing] = useState(false);

	const initNotifications = async () => {
		if (notifications) {
			return;
		}
		try {
			let urls = await notificationHelper.fetchNotificationsURLS(inboxes[0]);
			setNotifications(urls);
		} catch (error) {
			console.error(error);
		}
	};
	initNotifications();


	return (
		<div>
			<Row className="justify-content-md-center">
				<Col key="col-1" xs={12} sm={12} md={12} lg={1} xl={1}/>
				<Col key="col-2" xs={12} sm={12} md={12} lg={10} xl={10}>
					<Row>
						{notifications
							? notifications.map((url, index) => (
								<Col md={12} lg={4} key={index}>
									<NotificationItem
										key={index}
										isSharing={isSharing}
										setSharing={setSharing}
										url={url}
										{...props}
									/>
								</Col>
							))
							: null}
					</Row>
				</Col>
				<Col key="col-3" xs={12} sm={12} md={12} lg={1} xl={1}/>
			</Row>
		</div>
	);
};

export default NotificationsList;
