import React from "react";
import { notificationHelper } from "../../../../utils";

const NotificationItem = (props) => {
const {notification,webId}=props;
console.log(props); 

    const addSharedWithMe=(notification)=>{
        console.log(notification.read);
        if(!notification.read){
        notificationHelper.addRouteSharedWithMe(notification.object,webId);
        notificationHelper.markAsRead(notification);
        }
    };
    addSharedWithMe(notification);
  return (
    <div>
      <h2>{notification.title}</h2>
      <p>Autor:{notification.actor}</p>
      <p>Objeto:{notification.object}</p>
    </div>
  );
};

export default NotificationItem;
