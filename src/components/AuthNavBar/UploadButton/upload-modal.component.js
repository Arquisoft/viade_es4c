import React from "react";
import {MDBBtn} from "mdbreact";
import Image from "react-bootstrap/Image";
import "./upload-button.css";
import Modal from "react-bootstrap/Modal";
import {UploadComponent} from "./upload.component";

/**
 * Button triggering a modal pop-up with the UploadComponent
 * @returns {*}
 */
const UploadButton = () => {
	const [isOpen, setIsOpen] = React.useState(false);

	const showModal = () => {
		setIsOpen(true);
	};

	const hideModal = () => {
		setIsOpen(false);
	};

	return (
		<>
			<MDBBtn onClick={showModal}  color="primary" outline>
				<Image className="button-img" src="/img/upload.svg"/>
				<p className="font-weight-bold less-margin">Upload a route</p>
			</MDBBtn>
			<Modal show={isOpen} onHide={hideModal}>
				<Modal.Body><UploadComponent/></Modal.Body>
			</Modal>
		</>
	);
};

export default UploadButton;
