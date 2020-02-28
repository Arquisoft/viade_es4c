import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import {
  Home,Login,Friends,Profile,Register,NotFound,MyRoutes,FriendsRoutes,Upload
} from "./containers";

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
        <Route path="/" exact>      {/* Homepage - "/" */}
            <Home/>
        </Route>
        <Route path="/login" exact>      {/* Login - "/login" */}
            <Login/>
        </Route>
        <Route path="/friends" exact>      {/* Friends - "/friends" */}
            <Friends/>
        </Route>
        <Route path="/profile" exact>      {/* Profile - "/profile" */}
            <Profile/>
        </Route>
        <Route path="/myRoutes" exact>      {/* MyRoutes - "/myRoutes" */}
            <MyRoutes/>
        </Route>
        <Route path="/friendsRoutes" exact>      {/* FriendsRoutes - "/friendsRoutes" */}
            <FriendsRoutes/>
        </Route>
        <Route path="/register" exact>      {/* Register - "/register" */}
            <Register/>
        </Route>
        <Route path="*" >      {/* In case that the page not exist, 404 error*/}
            <NotFound/>
        </Route>
      </Switch>
    </Fragment>
  </Router>
);
  }

export default Routes;