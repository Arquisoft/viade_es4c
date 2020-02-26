import React, {Fragment} from "react";
import {NavLink} from "react-router-dom";
import {Login} from "../../containers";
import Image from 'react-bootstrap/Image';
import "./navbar.css";
import UploadButton from "./UploadButton";

/**
 * Navigation Bar to use at the top of the site on each page
 * @param props
 *  @webId ID of the user
 * @returns {*}
 */
const NavBar = (props) => {
	const webId = props.webId;

	return (
		<header role="navigation" className="header">
			<section className="header-wrap">
				<div className="logo-block">
					<NavLink to="/">
						<img src="/img/logo.svg" alt="Viade"/>
					</NavLink>
				</div>
			</section>
			<UploadButton/>
			<div>
				{webId ? (
					<Fragment>
						<NavLink className="float-right" to="/logout">
							<Image src="/img/logout.svg"/>
						</NavLink>
						<NavLink exact to="/friends" className="link" activeClassName="selected-link">Friends</NavLink>
						<NavLink to={webId} className="link" activeClassName="selected-link">Profile</NavLink>
					</Fragment>
				) : (
					<Login/>
				)}
			</div>
		</header>
	);
};

export default NavBar;
