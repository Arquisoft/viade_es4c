import React from "react";
import {Image, Spinner} from "react-bootstrap";
import "./cards.css";

export const RouteCardLoaderComponent = () => {

	return (
		<div className="card">
			<div className="card-left">
				<Image src={process.env.PUBLIC_URL + "/img/routes/route.png"} alt={"Route"}
					   className="card-image"/>
				<div className="card-extra">
					<h3>Loading</h3>
					<Spinner animation="border" role="status" variant="primary">
						<span className="sr-only">Loading...</span>
					</Spinner>
				</div>
			</div>
			<div className="card-right">
				<h3>Loading</h3>
				<Spinner animation="border" role="status" variant="primary">
					<span className="sr-only">Loading...</span>
				</Spinner>
			</div>
		</div>
	);
};