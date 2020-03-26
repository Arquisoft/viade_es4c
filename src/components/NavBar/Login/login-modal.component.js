import * as React from "react";
import Modal from "react-bootstrap/Modal";
import {MDBBtn} from "mdbreact";
import LoginComponent from "./login.component";

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
		<>
			<MDBBtn onClick={showModal} color="orange" outline>
				Login
			</MDBBtn>
			<Modal show={isOpen} onHide={hideModal}>
				<Modal.Body><LoginComponent/></Modal.Body>
			</Modal>
		</>
	);
};

export default LoginModal;