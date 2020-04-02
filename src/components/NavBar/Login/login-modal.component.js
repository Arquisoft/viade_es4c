import * as React from "react";
import Modal from "react-bootstrap/Modal";
import LoginComponent from "./login.component";
import {CustomButton} from "../../Customs";

/**
 * Button triggering a modal pop-up with the LoginComponent
 * @returns {*}
 * @constructor
 */
const LoginModal = () => {
	
	const [isOpen, setIsOpen] = React.useState(false);

	const showModal = () => {
		setIsOpen(true);
	};

	const hideModal = () => {
		setIsOpen(false);
	};

	return (
		<div>
			<CustomButton onClick={showModal} img="/img/buttons/login.png" text="Login"/>
			<Modal show={isOpen} onHide={hideModal}>
				<Modal.Body><LoginComponent/></Modal.Body>
			</Modal>
		</div>
	);
};

export default LoginModal;