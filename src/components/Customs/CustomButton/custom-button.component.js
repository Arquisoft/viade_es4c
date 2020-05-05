import React from "react";
import {Image} from "react-bootstrap";
import "./custom-button.css";

/**
 * Customized and generic button to use through the application
 * @param props
 * 			onClick, action to perform by the button
 * 			className, extra classes of the button
 * 			type, type of the button in case it's different to button
 * 			disabled, property to set the button as disabled or not
 * 			img, image of the button if it will have any
 * 			text, text of the button (also the alt of the image in case it has
 * @returns {*}
 * @constructor
 */
const CustomButton = (props) => {

	return (
		<button onClick={props.onClick} className={"custom-button " + (props.className ? props.className : "")}
			type={(props.type ? props.type : "button") } disabled={(props.disabled ? props.disabled : false)}>
			{props.img ?
				<Image src={process.env.PUBLIC_URL + props.img} alt={props.text} className="cb-img"/>
				: null}
			{props.text}
		</button>
	);

};

export default CustomButton;