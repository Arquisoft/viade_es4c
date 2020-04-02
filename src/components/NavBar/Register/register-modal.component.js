import * as React from "react";
import Modal from "react-bootstrap/Modal";
import RegisterContainer from "./register.container";
import {CustomButton} from "../../";

/**
 * Button triggering a modal pop-up with the RegisterComponent
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
			<CustomButton onClick={showModal} img="/img/buttons/register.png" text="Register"/>
			<Modal show={isOpen} onHide={hideModal}>
				<Modal.Body><RegisterContainer/></Modal.Body>
			</Modal>
		</div>
	);
};

export default LoginModal;