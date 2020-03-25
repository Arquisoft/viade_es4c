import React,{useEffect,useState} from "react";
import {notificationHelper} from "../../../utils";

const NotificationsList=(props)=>{
    const { webId,inboxes } = props;    
    notificationHelper.fetchNotifications(inboxes[0]);
    
   
    return(
        <div>
            <p>Mensajes no leidos:{}</p>

        </div>
    )
}

export default NotificationsList;