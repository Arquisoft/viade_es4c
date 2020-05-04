import * as React from "react";
import Modal from "react-bootstrap/Modal";
import {CustomButton} from "../../Customs";

/**
 * Button triggering a modal pop-up with the component specified
 * @param props
 * 		img, image of the button
 * 		text, text of the button
 * 		component, component to open with the modal
 */
const CustomModal = (props) => {

	// Status of the button to reload when it changes
	const [isOpen, setIsOpen] = React.useState(false);

	/*
	 * Opens the modal
	 */
	const showModal = () => {
		setIsOpen(true);
	};

	/*
	 * Closes the modal
	 */
	const hideModal = () => {
		setIsOpen(false);
	};

	return (
		<div>
			<CustomButton onClick={showModal} img={props.img} text={props.text}/>
			<Modal show={isOpen} onHide={hideModal}>
				<Modal.Body>
					{props.component}
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default CustomModal;