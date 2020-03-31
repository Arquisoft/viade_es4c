import React, { useState } from "react";
import { notificationHelper} from "../../../../viade";
import NotificationItem from "../NotificationItem";

const NotificationsList = props => {
  const { inboxes } = props;
  const [notifications, setNotifications] = useState();
  const [isSharing, setSharing] = useState(false);
  
  const initNotifications = async () => {
    if(notifications)return;
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
      {notifications
        ? notifications.map((url, index) => (
            <NotificationItem
              key={index}
              isSharing={isSharing}
              setSharing={setSharing}
              url={url}
              {...props}
            />
          ))
        : null}
    </div>
  );
};

export default NotificationsList;
