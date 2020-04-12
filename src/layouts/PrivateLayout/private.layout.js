import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import {withAuthorization} from "../../hooks";
import {AuthNavBar, Loader} from "../../components";
import {permissionHelper} from "../../utils";

/**
 * Controls the paths that can be accessed only by logged users. If a not logged-in user tries to access that path he will be redirected to "/login".In addition, it also shows Auth NavBar.
 * @param Component
 * @param webId
 * @param location
 * @param history
 * @param rest
 * @returns {*}
 * @constructor
 */
const PrivateLayout =({component:Component, webId, location, history, ...rest }) => {
  const errorMessages = {
    message: "The application permissions are not properly set. Please add additional permissions and try again",
    title: "Error",
    label: "Learn more",
    href: "https://solidsdk.inrupt.net/public/general/en/app-permissions.html"
  };
  useEffect(() => {
    if (webId) {
      permissionHelper.checkPermissions(webId, errorMessages);
    }
  }, [webId, errorMessages]);

  return  (
    <Route
      {...rest}
      component={({ history, location, match }) => (
        <div>
          <AuthNavBar {...{ history, location, match, webId }} />
          <Component {...{ history, location, match,webId }} />
        </div>
      )}
    />
  );
};

export default withAuthorization(PrivateLayout);
