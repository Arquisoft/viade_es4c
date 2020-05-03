import React from "react";
import {routeHelper} from "../../viade";
import {RouteList} from "../../components/";

/**
 * Page displaying the user routes
 * @param props
 * 			webId, webId of the current user
 * @returns {*}
 * @constructor
 */
const MyRoutesComponent = (props) => {
		const {webId}=props;
		return (
			<RouteList webId={webId} readRoutes={routeHelper.fetchSupportedUrlMyRoutes} share={true}/>
		);
};

export default MyRoutesComponent;
