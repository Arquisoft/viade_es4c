import * as React from "react";
import Modal from "react-bootstrap/Modal";
import {MDBBtn} from "mdbreact";
import RegisterContainer from "./register.container";

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
		<>
			<MDBBtn onClick={showModal} color="orange" outline>
				Register
			</MDBBtn>
			<Modal show={isOpen} onHide={hideModal}>
				<Modal.Body><RegisterContainer/></Modal.Body>
			</Modal>
		</>
	);
};

export default LoginModal;