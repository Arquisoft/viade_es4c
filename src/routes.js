import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import {
  Home,Login,Friends
} from "./containers";

import {NotLoggedInLayout,PublicLayout} from "./layouts";

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
        <PublicLayout component={Home} path="/" exact/>      {/* Homepage - "/" */}
        <NotLoggedInLayout component={Login} path="/login"/>
        <Route path="/friends" exact>      {/* Friends - "/friends" */}
            <Friends/>
        </Route>
        <Redirect to="/404" />      {/* If none page is loaded redirects to 404 error page */}
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;