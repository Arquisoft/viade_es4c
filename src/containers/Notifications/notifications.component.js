import React from "react";
import {NotificationsList} from "./children";

const Notifications = (props) => {
   
  return (
    <div>
      <NotificationsList {...props}/>
      </div>
  );
};

export default Notifications;
