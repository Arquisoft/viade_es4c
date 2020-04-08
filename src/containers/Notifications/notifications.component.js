import React,{useState,useCallback,useEffect} from "react";
import {NotificationsList} from "./children";
import {ldflexHelper, errorToaster} from "../.././utils";

const Notifications = (props) => {
    const [inboxes, setInbox] = useState([]);
    const { webId } = props;
    
    const discoverInbox = useCallback(async () => {
        try {
          let inboxes = [];
          /**
           * Get user's global inbox path from pod.
           */
          const globalInbox = await ldflexHelper.discoverInbox(webId);
    
          if (globalInbox) {
            inboxes = [
              ...inboxes,
              { path: globalInbox, inboxName: "Global", shape: "default" }
            ];
          }
          /**
           * If user doesn't has inbox in his pod will show an error and link to
           * know how fix it.
           */
          if (inboxes.length === 0) {
            errorToaster("Your inbox couldn't be found","Error");
          }
          setInbox(inboxes);
        } catch (error) {
          console.error(error);
          errorToaster("An error has occurred with the inbox folder","Error");
        }
      }, [webId]);

      const inboxUrl = inboxes.map((item) => item.path);

      useEffect(() => {
        if (webId) {
          discoverInbox();
        }
      }, [webId,discoverInbox]);
  return (
      <NotificationsList inboxes={inboxUrl} {...props}/>
  );
};

export default Notifications;
