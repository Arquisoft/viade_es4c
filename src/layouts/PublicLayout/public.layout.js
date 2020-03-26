import React from "react";
import {Route} from "react-router-dom";
import {useWebId} from "@inrupt/solid-react-components";
import {AuthNavBar, NavBar} from "../../components";

/**
* Controls the paths that can be accessed by any user (may or may not be logged in). 
In addition, it also shows NavBar or Auth NavBar depending on whether the user is logged in or not.
*@param {Component} component - The Container to be shown
*@param {String} path - path asigned to the container
*/
const PublicLayout = (props) => {
  const { component: Component, ...rest } = props;
  const webId=useWebId();
  return (
    <Route
      {...rest}
      component={({ history, location, match }) => (
        <div>
          {webId ? (
            <AuthNavBar {...{ history, location, match, webId }} />
          ) : (
            <NavBar
              {...{ history, location, match }}
            />
          )}
          <Component {...{ history, location, match }} />
        </div>
      )}
    />
  );
};

export default PublicLayout;
