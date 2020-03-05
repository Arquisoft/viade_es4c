import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch} from "react-router-dom";

import {
  Home,Login,Friends,Profile,Register,NotFound,MyRoutes,FriendsRoutes,RoutesList, ViewMap
} from "./containers";

import { NotLoggedInLayout, PublicLayout, PrivateLayout } from "./layouts";


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
        <PublicLayout component={Home} path="/" exact />      {/* Homepage - "/" */}
        <NotLoggedInLayout component={Login} path="/login" exact /> {/* Login - "/login" */}
        <NotLoggedInLayout component={Register} path="/register" exact /> {/* Register - "/register" */}
        <PrivateLayout component={Friends} path="/friends" exact /> {/* Friends - "/friends" */}
        <PrivateLayout component={Profile} path="/profile" exact /> {/* Profile - "/profile" */}
        <PrivateLayout component={MyRoutes} path="/myRoutes" exact /> {/* My Routes - "/myROutes" */}
        <PrivateLayout component={FriendsRoutes} path="/friendsRoutes" exact /> {/* Friends Routes - "/friendsRoute" */}
        <PrivateLayout component={RoutesList} path="/routesList" exact /> {/* Routes List - "/routesList" */}
        <PrivateLayout component={ViewMap} path="/viewMap" exact /> {/* View Map - "/viewMap" */}
        <PublicLayout component={NotFound} path="*"/> {/* Error - "*" */}


      </Switch>
    </Fragment>
  </Router>
);
  }

export default Routes;