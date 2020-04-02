
import React from "react";
import {routeHelper} from "../../viade";
import {RouteList} from "../../components/";

const FriendsRoutesComponent =(props)=> {
	const {webId}=props;
		return (
			<RouteList webId={webId} readRoutes={routeHelper.fetchUrlSharedWithMeRoutes}></RouteList>
		);
}

export default FriendsRoutesComponent;