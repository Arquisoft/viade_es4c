import React from "react";
import {notificationHelper,} from "../../../../viade";
import {NotificationCard} from "../../../../components";

class NotificationItem extends React.Component {
	constructor(props) {
		super(props);
		const {url, webId, setSharing, isSharing} = props;
		this.url = url;
		this.webId = webId;
		this.setSharing=setSharing;
		this.isSharing=isSharing;
		this.state = {};
	}

	init = async () => {
		if (this.state.notification) {
			return;
		}
		const notification = await notificationHelper.fetchNotification(this.url);
		this.setState({notification: notification});
	};

	addSharedWithMe = async (notification) => {
		if (!notification) {
			return;
		}
		if (!notification.read) {
			this.setSharing(true);
			await notificationHelper.addRouteSharedWithMe(notification.object, this.webId);
			await notificationHelper.markAsRead(notification);
			this.setSharing(false);
		}
	};

	render() {
		this.init();
		return (
			<div>
				{this.state.notification ?
					<NotificationCard
						name={this.state.notification.object.toString().split("/").pop()}
						user={this.state.notification.actor.toString()
							.substr(8, this.state.notification.actor.toString().length - 40)}
						read={this.state.notification.read}
						action={() => this.addSharedWithMe(this.state.notification)}
						disabled={this.isSharing}/>
					: null}
			</div>
		);
	}
}

export default NotificationItem;
