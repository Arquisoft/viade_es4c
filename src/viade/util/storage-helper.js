import {permissionHelper} from "../../utils";
import auth from "solid-auth-client";
import FC from "solid-file-client";
const fc = new FC(auth);

export const getViadeFolder = (webId) => {
    return webId.split("profile")[0] + "viade/";
  };
  
  export const getMyRoutesFolder = (webId) => {
    return getViadeFolder(webId) + "routes/";
  };

  export const getMediaFolder = (webId) => {
    return getViadeFolder(webId) + "media/";
  };
  
  export const getSharedWithMeFile = (webId) => {
    return getViadeFolder(webId) + "shared_with_me.txt";
  };

  export const getInboxFolder = (webId) => {
    return getViadeFolder(webId) + "inbox/";
  };


const createInbox=(webId)=> {
    const path=getInboxFolder(webId);
    fc.createFolder(path).then(async ()=> {await permissionHelper.checkOrSetInboxAppendPermissions(path,webId);});
};

const createSharedMeFile=(webId)=> {
    const path=getSharedWithMeFile(webId);
    fc.createFile(path,"{\"rutas\":[]}","text/plain",{});
};

const createMediaFolder=(webId)=> {
    const path=getMediaFolder(webId);
    fc.createFolder(path);
};

const createRoutesFolder=(webId)=> {
    const path=getMyRoutesFolder(webId);
    fc.createFolder(path);
};

export const initFolderStructure=async (webId)=> {
    await createRoutesFolder(webId);
    await createMediaFolder(webId);
    await createSharedMeFile(webId);
    await createInbox(webId);
};

export const checkFolderStructure=async (webId)=> {
    if(!await fc.itemExists(getViadeFolder(webId))){
        initFolderStructure(webId);
        return;
    }
    if(!await fc.itemExists(getMyRoutesFolder(webId))){
        await createRoutesFolder(webId);
    }
    if(!await fc.itemExists(getMediaFolder(webId))){
        await createMediaFolder(webId);
    }
    if(!await fc.itemExists(getInboxFolder(webId))){
        await createInbox(webId);
    }
    if(!await fc.itemExists(getSharedWithMeFile(webId))){
        await createSharedMeFile(webId);
    }
};
