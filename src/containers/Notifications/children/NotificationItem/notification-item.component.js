import React from "react";
import { notificationHelper } from "../../../../utils";

const NotificationItem = (props) => {
const {notification,webId,setSharing,isSharing}=props; 

    const addSharedWithMe=async (notification)=>{
      console.log(notification.object+"-"+notification.read);
        if(!notification.read){
        setSharing(true);
        await notificationHelper.addRouteSharedWithMe(notification.object,webId);
        await notificationHelper.markAsRead(notification);
        setSharing(false);
        }
    };
  return (
    <div>
      <h2>{notification.title}</h2>
      <p>Autor:{notification.actor}</p>
      <p>Objeto:{notification.object}</p>
      {!notification.read?
      <button disabled={isSharing} onClick={()=>addSharedWithMe(notification)}>Aceptar ruta</button>
      :null}
    </div>
  );
};

export default NotificationItem;
