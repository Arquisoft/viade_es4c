import {
  AccessControlList,
  AppPermission,
} from "@inrupt/solid-react-components";
import { errorToaster } from "./index";
import auth from "solid-auth-client";
import FC from "solid-file-client";
const fc = new FC(auth);
// Check that all permissions we need are set. If any are missing, this returns false
const checkAppPermissions = (userAppPermissions, appPermissions) =>
  appPermissions.every((permission) => userAppPermissions.includes(permission));

// Function to check for a specific permission included in the app
export const checkSpecificAppPermission = async (webId, permission) => {
  const userAppPermissions = await AppPermission.checkPermissions(webId);
  return userAppPermissions.permissions.includes(permission);
};
/**
 * SDK app will need all the permissions by the user pod so we check these permissions to work without any issues.
 * Error Message object is to hold the title, message, etc strings, as we can't use i18n libraries in this non-React file
 */
export const checkPermissions = async (webId, errorMessage) => {
  /**
   * Get permissions from trustedApp.
   */
  const userApp = await AppPermission.checkPermissions(webId);

  /**
   * Get modes permissions from solid-react-components
   */
  const permissions = AccessControlList.MODES;
  const { APPEND, READ, WRITE, CONTROL } = permissions;

  // If we are missing permissions that the app requires, display an error message with a Learn More link
  if (
    userApp === null ||
    userApp.permissions === null ||
    !checkAppPermissions(userApp.permissions, [APPEND, READ, WRITE, CONTROL])
  ) {
    errorToaster(errorMessage.message, errorMessage.title, {
      label: errorMessage.label,
      href: errorMessage.href,
    });
  }
};

/**
 * Helper function to fetch permissions for the game inbox, and if permissions are not set
 * correctly, then add them. This repairs a broken inbox.
 * @param inboxPath
 * @returns {Promise<void>}
 */
export const checkOrSetInboxAppendPermissions = async (inboxPath, webId) => {
  // Fetch app permissions for the inbox and see if Append is there
  const inboxAcls = new AccessControlList(webId, inboxPath);
  const permissions = await inboxAcls.getPermissions();
  const inboxPublicPermissions = permissions.filter(
    (perm) => perm.agents === null
  );

  const appendPermission = inboxPublicPermissions.filter((perm) =>
    perm.modes.includes(AccessControlList.MODES.APPEND)
  );

  if (appendPermission.length <= 0) {
    // What do we do when the permission is missing? Add it!
    try {
      // Permission object to add. A null agent means Everyone
      const permissions = [
        {
          agents: null,
          modes: [AccessControlList.MODES.APPEND],
        },
      ];
      const ACLFile = new AccessControlList(webId, inboxPath);
      await ACLFile.createACL(permissions);
    } catch (error) {
      // TODO: Better error handling here
      throw error;
    }
  }

  return true;
};

export const setReadPermissionRoute=async(webId,agent,route)=>{
  setReadPermission(webId,agent,route.url.toString());
  for(let i=0;i<route.media.length;i++){
    setReadPermission(webId,agent,route.media[i].iri.toString())
  }
};


export const setReadPermission = async (webId,agent, documentUrl) => {
  let path=documentUrl.split("#")[0];
  const ACLFile = new AccessControlList(webId, path);
  if(!(await fc.itemExists(ACLFile.aclUri))){
    const agentsPermissions = [
      {
        agents: agent,
        modes: [AccessControlList.MODES.READ],
      },
    ];
    await ACLFile.createACL(agentsPermissions);
    return;
  }
  const permissions = await ACLFile.getPermissions();
  const modeRead = [AccessControlList.MODES.READ];
  const listPermissions = permissions.filter(perm => perm.modes.toString() === modeRead.toString())
  if(listPermissions.length===0){//No se ha compartido con nadie
    const agentsPermissions = [
      {
        agents: agent,
        modes: [AccessControlList.MODES.READ],
      },
    ];
    await ACLFile.createACL(agentsPermissions);
  }else{//Ya tiene gente compartida
    let newAgents=listPermissions[0].agents;
    newAgents.push(agent);
    const agentsPermissions = [
      {
        agents: newAgents,
        modes: [AccessControlList.MODES.READ],
      },
    ];
    await ACLFile.createACL(agentsPermissions);
  }
};
  

