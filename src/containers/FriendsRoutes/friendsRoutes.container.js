
import React from "react";
import {routeHelper} from "../../viade";
import {RouteList} from "../../components/";

/**
 * Page displaying the friend shared routes
 * @param props
 * 			webId, webId of the users
 * @returns {*}
 * @constructor
 */
const FriendsRoutesComponent = (props) => {
	const {webId}=props;
		return (
			<RouteList webId={webId} readRoutes={routeHelper.fetchUrlSharedWithMeRoutes} share={false}/>
		);
};

export default FriendsRoutesComponent;