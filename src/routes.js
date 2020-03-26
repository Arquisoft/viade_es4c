import React, {Fragment} from "react";
import {BrowserRouter as Router, Switch} from "react-router-dom";

{
	Friends,
	Home,
	MyRoutes,
	NotFound,
	Profile,
	RoutesList,
	ShowRoute,Share,Notifications
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
					<PublicLayout component={Home} path="/" exact/> {/* Homepage - "/" */}
					<PrivateLayout component={Friends} path="/friends" exact/> {/* Friends - "/friends" */}
					<PrivateLayout component={ShowRoute} path="/route" exact/> {/* ShowRoute - "/route" */}
					<PrivateLayout component={Profile} path="/profile" exact/> {/* Profile - "/profile" */}
					<PrivateLayout component={MyRoutes} path="/myRoutes" exact/> {/* My Routes - "/myROutes" */}
					<PrivateLayout component={RoutesList} path="/routesList" exact/> {/* Routes List - "/routesList" */}
					<PrivateLayout component={ShowRoute} path="/showRoute" exact/> {/* View Map - "/viewMap" */}
    <PrivateLayout component={Share} path="/share" exact /> {/* Share - "/Share" */}
    <PrivateLayout component={Notifications} path="/notifications" exact /> {/* Notifications - "/notifications" */}
					<PublicLayout component={NotFound} path="*"/> {/* Error - "*" */}

				</Switch>
			</Fragment>
		</Router>
	);
};


export default Routes;