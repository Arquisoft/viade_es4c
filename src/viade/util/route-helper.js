import { SmallRDFToRoute, ParserToRoute, RDFToRoute } from "../Parsers";
import Fetcher from "./fetcher";
import auth from "solid-auth-client";
import FC from "solid-file-client";
import sparql from "../sparql-queries.json";
const fc = new FC(auth);

export const getViadeFolder = (webId) => {
  return webId.split("profile")[0] + "public/viade";
};

export const getMyRoutesFolder = (webId) => {
  return getViadeFolder(webId) + "/routes";
};

export const getSharedWithMeFolder = (webId) => {
  return getViadeFolder(webId) + "/shared_with_me.ttl";
};

export const fetchUrlSharedWithMeRoutes = async () => {
  try {
    let webId = (await auth.currentSession()).webId;
    let result =await Fetcher.fetch(sparql.shared_with_me.route_uris,getSharedWithMeFolder(webId));
     return result.map((route)=>route["route"]);
  } catch (err) {
    console.error(err);
    throw new Error("An error has occurred loading the routes shared with you");
  }
};

/*
     create=async()=> {
        const basic=`
            @prefix schema: <http://schema.org/> .
        `;
        fc.createFile(basic,this.path,"text/turtle",{});
    }

    insert=async(friend,route)=> {
        const insert=`
        []
            a schema:ShareAction ;
            schema:agent "`+friend+`" ;
            schema:object "`+route+`";
            schema:recipient "`+this.webId+`".
        `;
        let docu = await fc.readFile(this.path);
        docu+=insert;
        fc.createFile(this.path,basic,"text/turtle",{});
    }
 
 */

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
  return ParserToRoute.parse(file).then((route) => route,(err) => {throw err;});
};
