import React from 'react';
import { Route} from 'react-router-dom';
import { useWebId } from '@inrupt/solid-react-components';
import { NavBar, AuthNavBar } from '../../components';


const PublicLayout = props => {
  const webId = useWebId();
  console.log(webId?true:false);
  const { component: Component, ...rest } = props;
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
