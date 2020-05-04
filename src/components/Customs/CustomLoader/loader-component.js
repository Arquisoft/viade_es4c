import React from "react";
import {RingLoader} from "react-spinners";
import {Col, Row} from "react-bootstrap";

/**
 * Spinner to show when a page is loading
 * @param props
 * 			size, size of the spinner
 * @returns {*}
 * @constructor
 */
const Loader = (props) => {
	return <Row className="sweet-loading">
		<Col xs={12} md={5}/>
		<Col xs={12} md={"auto"}>
			<RingLoader
				size={props.size}
				color={"#bcdad3"}
			/>
		</Col>
		<Col xs={12} md={5}/>
	</Row>;
};

export default Loader;