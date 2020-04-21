import React, { Fragment } from "react";
import { notificationHelper } from "../../../../viade";
import { NotificationCard } from "../../../../components";
import { errorToaster } from "../../../../utils";

class NotificationItem extends React.Component {
  constructor(props) {
    super(props);
    const { url, webId, setSharing, isSharing } = props;
    this.url = url;
    this.webId = webId;
    this.setSharing = setSharing;
    this.isSharing = isSharing;
    this.state = {};
  }

  init = async () => {
    if (this.state.notification) {
      return;
    }
    try {
      const notification = await notificationHelper.fetchNotification(this.url);
      this.setState({ notification: notification });
    } catch (err) {
      console.error(err);
      let link = { href: this.url, label: this.url };
      errorToaster(err.message, err.name, link);
    }
  };

  addSharedWithMe = async (notification) => {
    if (!notification) {
      return;
    }
    if (!notification.read) {
      try {
        this.setSharing(true);
        await notificationHelper.addRouteSharedWithMe(
          notification.object,
          this.webId
        );
        const marked = await notificationHelper.markAsRead(
          notification
        );
        this.setSharing(false);
        return marked;
      } catch (err) {
        throw err;
      }
    }
  };

  render() {
    this.init();
    return (
      <Fragment>
        {this.state.notification ? (
          <NotificationCard
            name={this.state.notification.object.toString().split("/").pop()}
            user={this.state.notification.actor
              .toString()
              .substr(8, this.state.notification.actor.toString().length - 40)}
            read={this.state.notification.read}
            action={() => this.addSharedWithMe(this.state.notification)}
            disabled={this.isSharing}
          />
        ) : null}
      </Fragment>
    );
  }
}

export default NotificationItem;
