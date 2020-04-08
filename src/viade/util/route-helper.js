import { SmallRDFToRoute, ParserToRoute, RDFToRoute } from "../Parsers";
import auth from "solid-auth-client";
import FC from "solid-file-client";
const fc = new FC(auth);

export const getMyRoutesFolder = (webId) => {
  return getViadeFolder(webId) + "/routes";
};

export const getViadeFolder = (webId) => {
  return webId.split("profile")[0] + "public/viade";
};

export const getSharedWithMeFolder = (webId) => {
  return getViadeFolder(webId) + "/shared_with_me.txt";
};

export const fetchUrlSharedWithMeRoutes = async () => {
  try {
    let webId = (await auth.currentSession()).webId;
    let filesString = await fc.readFile(getSharedWithMeFolder(webId));
    let routes= JSON.parse(filesString).rutas;
    if(!routes)return [];
    return routes;
  } catch (err) {
    console.error(err);
    throw new Error("An error has occurred loading the routes shared with you");
  }
};

export const fetchUrlMyRoutes = async () => {
  try {
    let webId = (await auth.currentSession()).webId;
    let folder = getMyRoutesFolder(webId);
    if (!(await fc.itemExists(folder))) {
      return [];
    }
    let routes = await fc.readFolder(folder);
    return routes.files.map((file) => file.url);
  } catch (err) {
    console.error(err);
    throw new Error("An error has occurred loading your routes");
  }
};

export const getBasicRoute = async (url) => {
  try {
    return await SmallRDFToRoute.parse(url);
  } catch (err) {
    console.error(err);
    throw new Error("An error occurred while loading the route");
  }
};

export const getFullRoute = async (url) => {
  try {
    return await RDFToRoute.parse(url);
  } catch (err) {
    console.error(err);
    throw new Error("An error occurred while loading the route");
  }
};

export const parseRoutefromFile = (file) => {
  return ParserToRoute.parse(file).then((route) => route,(err)=>{throw err});
};
