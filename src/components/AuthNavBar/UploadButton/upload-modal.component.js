import React from "react";
import "./upload-button.css";
import Modal from "react-bootstrap/Modal";
import {UploadComponent} from "./upload.component";
import {CustomButton} from "../../";

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
		<div>
			<CustomButton onClick={showModal} text="Upload a route" img="/img/buttons/upload.png"/>
			<Modal show={isOpen} onHide={hideModal}>
				<Modal.Body><UploadComponent/></Modal.Body>
			</Modal>
		</div>
	);
};

export default UploadButton;
