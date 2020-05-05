import React, {Fragment, useState} from "react";
import {routeHelper} from "../../../viade";
import {RouteCard} from "../../../components";
import {errorToaster} from "../../../utils";
import {Col} from "react-bootstrap";
import {Link} from "react-router-dom";

/**
 * Item with all the info and functionality of the routes on the list
 * @param props
 * 			url, url of the route
 * 			share, if the route is owned or shared
 * @returns {*}
 * @constructor
 */
const RouteItem = (props) => {
	const [route, setRoute] = useState();
	const {url, share} = props;

	/**
	 * Loads the info of the route
	 * @returns {Promise<void>}
	 */
	const init = async () => {
		if (route) {
			return;
		}
		try {
			setRoute(await routeHelper.getBasicRoute(url));
		} catch (error) {
			let link = {href: url, label: url};
			errorToaster(error.message, error.name, link);
		}
	};

	init();

	return (
		<Fragment>
			{route ?
				<Col md={12} lg={4}>
					{/* Route card to display with the link to its page */}
					<Link
						key={route.name}
						className="card-a"
						to={"/showRoute/" + (share ? "my/" : "friend/") + encodeURIComponent(route.url)}
					>
						<RouteCard name={route.name} desc={route.description} media={route.media}/>
					</Link>
				</Col> : null}
		</Fragment>

	);
};

export default RouteItem;
