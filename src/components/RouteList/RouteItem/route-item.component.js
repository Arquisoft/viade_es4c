import React, { Fragment,useState } from "react";
import { routeHelper } from "../../../viade";
import { RouteCard } from "../../../components";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RouteItem = props => {
  const [route, setRoute] = useState();
  const { url} = props;

  const init = async () => {
    if (route) {
      return;
    }
    setRoute(await routeHelper.getBasicRoute(url));
  };
  init();
  return (
    <Fragment>
      {route?<Col md={12} lg={4}>
      <Link
        key={route.name}
        className="card-a"
        to={{
          pathname: "/showRoute",
          state: {
            route: route.url
          }
        }}
      >
        <RouteCard name={route.name} desc={route.description} media={route.media} />
      </Link>
    </Col>:null}
    </Fragment>
    
  );
};

export default RouteItem;
