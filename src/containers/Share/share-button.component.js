import React, { Fragment } from "react";
import {MDBBtn} from "mdbreact";
import {NavLink} from "react-router-dom";
import Image from "react-bootstrap/Image";
import "./upload-button.css";

/**
 * Share Button to redirect to the share function
 * @returns {*}
 */
const ShareButton = () => {

	return (
		<Fragment>
			<NavLink to="/share">
				<MDBBtn color="primary" outline>
					<Image className="button-img" src="/img/upload.svg"/>
					<p>Share a route</p>
				</MDBBtn>
			</NavLink>
		</Fragment>
	);
};

export default ShareButton;
