import {SmallRDFToRoute,ParserToRoute,RDFToRoute} from "../Parsers";
import auth from "solid-auth-client";
import FC from "solid-file-client";
const fc = new FC(auth);

export const getMyRoutesFolder = (webId) => {
    return getViadeFolder(webId)+"/routes";
};

export const getViadeFolder = (webId) => {
    return webId.split("profile")[0] + "public/viade";
};

export const getSharedWithMeFolder = (webId) => {
    return getViadeFolder(webId)+"/shared_with_me.txt";
};

export const fetchUrlSharedWithMeRoutes = async () => {
		try {
            let webId = (await auth.currentSession()).webId;
			let filesString = await fc.readFile(getSharedWithMeFolder(webId));
			return JSON.parse(filesString).rutas;
		} catch {
			return null;
		}
};

export const fetchUrlMyRoutes = async () => {
    let webId = (await auth.currentSession()).webId;
    let folder=getMyRoutesFolder(webId);
    if (!await fc.itemExists(folder)) {
        return [];
    }
    let routes = await fc.readFolder(folder);
    return routes.files.map((file) => file.url);
};

export const getBasicRoute = (url) => {
    return SmallRDFToRoute.parse(url);
};

export const getFullRoute = async (url) => {
    return RDFToRoute.parse(url);
};

export const parseRoutefromFile = (file) => {
    return ParserToRoute.parse(file).then(route => route);
};