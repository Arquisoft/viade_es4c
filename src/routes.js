import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import {
  Home, Login, Friends
} from "./containers";

import { NotLoggedInLayout, PublicLayout, PrivateLayout } from "./layouts";


/**
 * Manages the BrowserRouter and so, all the route navigation
 * @returns {*}
 * @constructor
 */
const Routes = () => (
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
        <PrivateLayout component={Friends} path="/friends" exact /> {/* Friends - "/friends" */}
        <Redirect to="/404" />      {/* If none page is loaded redirects to 404 error page */}
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;