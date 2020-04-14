import * as React from "react";
import Modal from "react-bootstrap/Modal";
import {CustomButton} from "../../Customs";

/**
 * Button triggering a modal pop-up with the component specified
 * @param props
 * 		img -> Image of the button
 * 		text -> Text of the button
 * 		component -> Component to open with the modal
 */
const CustomModal = (props) => {

	const [isOpen, setIsOpen] = React.useState(false);

	const showModal = () => {
		setIsOpen(true);
	};

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