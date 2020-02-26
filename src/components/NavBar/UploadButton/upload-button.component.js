import React, { Fragment } from "react";
import {MDBBtn} from "mdbreact";
import {NavLink} from "react-router-dom";
import Image from "react-bootstrap/Image";
import "./upload-button.css";

/**
 * Upload Button to redirect to the upload function
 * @returns {*}
 */
const UploadButton = () => {

	return (
		<Fragment>
			<NavLink to="/upload">
				<MDBBtn color="primary" outline>
					<Image className="button-img" src="/img/upload.svg"/>
					<p>Upload a route</p>
				</MDBBtn>
			</NavLink>
		</Fragment>
	);
};

export default UploadButton;
