import React, {useState} from "react";
import {notificationHelper} from "../../../../viade";
import NotificationItem from "../NotificationItem";
import {Col, Row} from "react-bootstrap";
import {errorToaster} from "../../../../utils";
import {Loader} from "../../../../components";
import Spacer from "../../../../components/Spacer";

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
			errorToaster(error.message, error.name);
		}
	};
	initNotifications();

	return (
		<div>
			{notifications
				? <Row className="justify-content-md-center">
					<Col key="col-1" xs={12} sm={12} md={12} lg={1} xl={1}/>
					<Col key="col-2" xs={12} sm={12} md={12} lg={10} xl={10}>
						<Row>
							{notifications.length > 0
								? notifications.map((url, index) => (
									<Col md={12} lg={4} key={index}>
										<NotificationItem
											key={index}
											isSharing={isSharing}
											setSharing={setSharing}
											url={url}
											{...props}
										/>
									</Col>))
								: <h4 style={{textAlign: "center", margin: "15px 0 0 0", width: "100%"}}>
									Sadly, you don't have notifications to show here yet :(
								</h4>}
						</Row>
					</Col>
					<Col key="col-3" xs={12} sm={12} md={12} lg={1} xl={1}/>
				</Row>
				: <div>
					<Spacer/>
					<Loader size="150px"/>
				</div>
			}
		</div>
	);
};

export default NotificationsList;