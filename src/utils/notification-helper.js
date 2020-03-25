import { ldflexHelper } from './index';
import  auth from 'solid-auth-client';
import  FC   from 'solid-file-client';

const fc   = new FC( auth );

export const fetchNotifications=async (inboxURL)=>{
    console.log(inboxURL);
    if(!inboxURL) return;
    const folder=await fc.readFolder(inboxURL,[]);
    let filesURL=folder.files.map((file)=>file.url);
    console.log(filesURL);
    let url;

    for(url in filesURL){
        let title=await ldflexHelper.fetchLdflexDocument(url)['http://purl.org/dc/terms#title'];
        console.log(`\n title: ${title}`);
    }

};

export const sendNotification = async (opponent, content, createNotification, to) => {
    try {
      if (to) {
        return createNotification(content, to);
      }
      /**
       * If the opponent doesn't have an inbox, show an error
       */
      throw new Error('Error: The opponent does not have an available inbox');
    } catch (error) {
      throw new Error(error);
    }
  };
  
  export const findUserInboxes = async paths => {
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
    inboxes.find(inbox => inbox.name === inbox1) || inboxes.find(inbox => inbox.name === inbox2);
  