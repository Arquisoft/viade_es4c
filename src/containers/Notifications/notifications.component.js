import React from "react";
import {NotificationsList} from "./children";

/**
 * Page listing the notifications
 * @param props     Properties to extend
 * @returns {*}
 * @constructor
 */
const Notifications = (props) => {
   
  return (
    <div>
      <NotificationsList {...props}/>
      </div>
  );
};

export default Notifications;
