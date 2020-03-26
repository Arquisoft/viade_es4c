import React,{useState} from "react";
import {notificationHelper} from "../../../../utils";
import NotificationItem from "../NotificationItem";
const NotificationsList=(props)=>{
    const { webId,inboxes } = props;
    const [notifications,setNotifications]=useState();
    const initNotifications = async () => {
        if(notifications)return;
        try {
          let n=await notificationHelper.fetchNotifications(inboxes[0]);
          setNotifications(n);
        } catch (error) {
         console.error(error);
        }
      };
      initNotifications();
    return(
        <div>
            {notifications?notifications.map((notification,index)=>
                <NotificationItem key={index} notification={notification} setNotifications={setNotifications} {...props}/>
            ):null}
        </div>
    );
}

export default NotificationsList;