import React from "react";
import {Image} from "react-bootstrap";
import "./custom-button.css";

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