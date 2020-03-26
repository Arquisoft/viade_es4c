import React from "react";
import {notificationHelper} from "../../../../utils";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const NotificationItem = (props) => {
	const {notification, webId, setSharing, isSharing} = props;

	const addSharedWithMe = async (notification) => {
		console.log(notification.object + "-" + notification.read);
		if (!notification.read) {
			setSharing(true);
			await notificationHelper.addRouteSharedWithMe(notification.object, webId);
			await notificationHelper.markAsRead(notification);
			setSharing(false);
		}
	};

	return (
		<Card style={{margin: "0px 0px 10px 0px", width: "50%"}}>
			<Card.Header>
                <h4 className="d-inline-block">{notification.title}</h4>
                {!notification.read ?
                    <Button disabled={isSharing} onClick={() => addSharedWithMe(notification)}
                        className="float-right d-inline-block">
                        Accept Route
                    </Button> : null}
			</Card.Header>
			<ListGroup variant="flush">
				<ListGroup.Item>From: {notification.actor.toString()
					.substr(8, notification.actor.toString().length - 40)}</ListGroup.Item>
				<ListGroup.Item>Route: {notification.object.toString().split("/").pop()}</ListGroup.Item>

			</ListGroup>
		</Card>
	);
};

export default NotificationItem;
