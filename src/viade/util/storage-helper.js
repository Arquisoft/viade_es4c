import {permissionHelper,infoToaster} from "../../utils";
import auth from "solid-auth-client";
import FC from "solid-file-client";
const fc = new FC(auth);

const ROUTES="viade/routes/";
const MEDIA="viade/media/";
const INBOX="viade/inbox/";
const SHARED_ME="viade/shared_with_me.txt";
const VIADE="viade/";

export const getBaseUrl=(webId)=>{
 return webId.split("profile")[0];
};

const createInbox=(base,webId)=> {
    fc.createFolder(base+INBOX).then(async ()=> {await permissionHelper.checkOrSetInboxAppendPermissions(base+INBOX,webId);});
};

const createSharedMeFile=(base)=> {
    fc.createFile(base+SHARED_ME,"{rutas:[]}","text/plain",{});
};

const createMediaFolder=(base)=> {
    fc.createFolder(base+MEDIA);
};

const createRoutesFolder=(base)=> {
    fc.createFolder(base+ROUTES);
};

export const initFolderStructure=async (webId)=>{
    const base=getBaseUrl(webId);
    await createRoutesFolder(base);
    await createMediaFolder(base);
    await createSharedMeFile(base);
    await createInbox(base,webId);
};

export const checkFolderStructure=async (webId)=> {
    infoToaster("Checking repository state");
    const base=getBaseUrl(webId);
    if(!await fc.itemExists(base+VIADE)){
        initFolderStructure(webId);
        return;
    }
    if(!await fc.itemExists(base+ROUTES)){
        await createRoutesFolder(base);
    }
    if(!await fc.itemExists(base+MEDIA)){
        await createMediaFolder(base);
    }
    if(!await fc.itemExists(base+INBOX)){
        await createInbox(base,webId);
    }
    if(!await fc.itemExists(base+SHARED_ME)){
        await createSharedMeFile(base);
    }
};
