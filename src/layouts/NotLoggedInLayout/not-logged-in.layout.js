import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { NavBar} from '../../components';
import { useWebId } from '@inrupt/solid-react-components';

const NotLoggedInLayout = props => {
  const { component: Component, ...rest } = props;
  const webId=useWebId();
  return !webId ? (
    <Route
      {...rest}
      component={matchProps => (
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
