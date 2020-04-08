import { ldflexHelper} from "../../utils/index";
import auth from "solid-auth-client";
import FC from "solid-file-client";
import { RDFToNotification, NotificationToRDF } from "../Parsers";

const fc = new FC(auth);

const orderByDate = (list) => {
  return list.sort((a, b) => new Date(b.published) - new Date(a.published));
};

export const fetchNotificationsURLS=async (inboxURL)=>{
  if (!inboxURL){
    return;
  }
  const folder = await fc.readFolder(inboxURL, []);
  return folder.files.map((file) => file.url);
}

export const fetchNotifications = async (inboxURL) => {
  if (!inboxURL){
    return;
  }
  let filesURL = await this.fetchNotificationsURLS(inboxURL);
  let i = 0;
  let notifications = [];
  for (i; i < filesURL.length; i++) {
    let noti = await RDFToNotification.parse(filesURL[i]);
    notifications.push(noti);

  }
  return orderByDate(notifications);
};

export const fetchNotification = async (url) => {
  try{
  return await RDFToNotification.parse(url);
  }catch(error){
    throw new Error("An error has occurred parsing the notification from RDF");
  }
};



export const sendNotification = async (
  opponent,
  content,
  createNotification,
  to
) => {
  try {
    if (to) {
      return createNotification(content, to);
    }
    /**
     * If the opponent doesn't have an inbox, show an error
     */
    throw new Error("The opponent does not have an available inbox");
  } catch (error) {
    throw new Error(error);
  }
};

export const findUserInboxes = async (paths) => {
  try {
    let inboxes = [];
    for await (const path of paths) {
      const { path: currentPath } = path;
      const inbox = await ldflexHelper.discoverInbox(currentPath);

      if (inbox) {
        inboxes = [...inboxes, { ...path, path: inbox }];
      }
    }

    return inboxes;
  } catch (error) {
    throw new Error(error);
  }
};

export const getDefaultInbox = (inboxes, inbox1, inbox2) =>
  inboxes.find((inbox) => inbox.name === inbox1) ||
  inboxes.find((inbox) => inbox.name === inbox2);

export const addRouteSharedWithMe = async (url, webId) => {
  
  const base = "/public/viade/shared_with_me.txt";
  const path = webId.split("/profile/card#me")[0] + base;
  if (!(await fc.itemExists(path))) {
    const obj = { rutas: [url] };
    await fc.createFile(path, JSON.stringify(obj), "text/plain", {});
    return;
  }
  let docu = await fc.readFile(path);
  let obj = JSON.parse(docu);
  obj.rutas.push(url);
  await fc.createFile(path, JSON.stringify(obj), "text/plain", {});
};

export const markAsRead = async (notification) => {
  try{
    notification.read = true;
  let docu = NotificationToRDF.parse(notification);
  await fc.createFile(notification.url, docu, "text/turtle", {});
  return true;
  }catch(err){
    throw new Error("The notification could not be marked as read");
  }
};
