import React, {Fragment} from "react";
import {BrowserRouter as Router, Switch} from "react-router-dom";

import {
	FriendsRoutes,
	Home,
	MyRoutes,
	NotFound,
	Profile,
	ShowRoute,
	Share,
	Notifications
} from "./containers";

import {PrivateLayout, PublicLayout} from "./layouts";


/**
 * Manages the BrowserRouter and so, all the route navigation
 * @returns {*}
 * @constructor
 */
const Routes = () => {
	return (
		<Router>
			<Fragment>
				{/* Chooses the first route matching the direction and loads it */}
				<Switch>
					{
						/*
						  PublicLayout para rutas que se tienen que mostrar a todos los usuarios(estén o no loggeados)
						  NotLoggedInLayout para rutas que se tienen que mostrar a usuarios que NO están loggeados
						  PrivateLayout para rutas que se tienen que mostrar a usuarios que SI están loggeados
						*/
					}
					<PublicLayout component={Home} path="/viade_es4c" exact/> {/* Homepage - "/" */}
					<PrivateLayout component={FriendsRoutes} path="/viade_es4c/friendsRoutes" exact/> {/* Friends - "/friends" */}
					<PrivateLayout component={ShowRoute} path="/viade_es4c/route" exact/> {/* ShowRoute - "/route" */}
					<PrivateLayout component={Profile} path="/viade_es4c/profile" exact/> {/* Profile - "/profile" */}
					<PrivateLayout component={MyRoutes} path="/viade_es4c/myRoutes" exact/> {/* My Routes - "/myROutes" */}
					<PrivateLayout component={ShowRoute} path="/viade_es4c/showRoute" exact/> {/* View Map - "/viewMap" */}
					<PrivateLayout component={Share} path="/viade_es4c/share" exact /> {/* Share - "/share" */}
					<PrivateLayout component={Notifications} path="/viade_es4c/notifications" exact /> {/* Notifications - "/notifications" */}
					<PublicLayout component={NotFound} path="*"/> {/* Error - "*" */}
				</Switch>
			</Fragment>
		</Router>
	);
};


export default Routes;