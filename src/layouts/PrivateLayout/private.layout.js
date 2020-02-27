import React,{useEffect} from "react";
import { Route } from "react-router-dom";
import { withAuthorization } from "@inrupt/solid-react-components";
import { AuthNavBar } from "../../components";
import { permissionHelper } from '../../utils';

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
  }, [webId]);

  return  (
    <Route
      {...rest}
      component={({ history, location, match }) => (
        <div>
          <AuthNavBar {...{ history, location, match, webId }} />
          <Component {...{ history, location, match }} />
        </div>
      )}
    />
  );
};

export default withAuthorization(PrivateLayout);
