import React, { Fragment,useState } from "react";
import { routeHelper } from "../../../viade";
import { RouteCard } from "../../../components";
import { errorToaster } from "../../../utils";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RouteItem = (props) => {
	const [route, setRoute] = useState();
	const {url} = props;

  const init = async () => {
    if (route) {
      return;
    }
    try{
      setRoute(await routeHelper.getBasicRoute(url));
    } catch(error) {
      let link={href:url,label:url};
      errorToaster(error.message,error.name,link);
    }
  };
  
  init();
  
  return (
    <Fragment>
      {route ? <Col md={12} lg={4}>
      <Link
        key={route.name}
        className="card-a"
        to={"/showRoute/" + encodeURIComponent(route.url)}
      >
        <RouteCard name={route.name} desc={route.description} media={route.media} />
      </Link>
    </Col> : null}
    </Fragment>
    
  );
};

export default RouteItem;