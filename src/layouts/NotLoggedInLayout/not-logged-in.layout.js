import React from "react";
import {Redirect, Route} from "react-router-dom";
import {NavBar} from "../../components";
import {useWebId} from "@inrupt/solid-react-components";

/**
* Controls the paths that can be accessed only by not logged users. If a logged-in user tries to access that path he will be redirected to "/"(home)
*In addition, it also shows NavBar.
*@param {Component} component - The Container to be shown
*@param {String} path - path asigned to the container
*/
const NotLoggedInLayout = (props) => {
  const { component: Component, ...rest } = props;
  const webId=useWebId();
  return !webId ? (
    <Route
      {...rest}
      component={ (matchProps) => (
        <div>
          <NavBar/>
          <Component {...matchProps} />
        </div>
      )}
    />
  ) : (
    <Redirect to="/" />
  );
};

export default NotLoggedInLayout;
