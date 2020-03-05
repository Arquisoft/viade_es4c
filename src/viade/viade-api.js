import auth from 'solid-auth-client';
import { solidHelper,storageHelper,permissionHelper,ldflexHelper } from "../utils";
import FC from "solid-file-client";
import * as jsonld from "jsonld";
const fc = new FC(auth);

const url_shared = "public/pruebita2.txt";

/**
 *
 * @param {String} from
 * @param {String} to
 * @param {String} route
 */
export const shareRoute = async (from, to, route) => {
  const baseTo = solidHelper.getBaseURL(to);
  console.log(await (await auth.currentSession()).webId);
  //console.log(await storageHelper.getAppStorage(to));
  /*if (!(await fc.itemExists(baseTo + url_shared))) {
    createSharedWithMeFile(to);
  }*/
  createSharedWithMeFile(to);
};

export const createSharedWithMeFile = async user => {
  const baseUser = solidHelper.getBaseURL(user);
  const sharedBasic = "asdsdasd";  
  console.log(sharedBasic);
  //await permissionHelper.checkOrSetInboxAppendPermissions("https://christianpelaez98.solid.community/inbox/",(await auth.currentSession()).webId);
  await ldflexHelper.createDocument("https://christianpelaez98.solid.community/inbox/funciona.txt", sharedBasic);
};

