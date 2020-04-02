import React, {Component} from "react";
import {Button, Image} from "react-bootstrap";
import "./routes-title.css";

/**
 * Component featuring the route information
 */
class RouteTitle extends Component {

	constructor(props) {
		super(props);
		this.name = props.route.name;
		this.description = props.route.description;
	}

	render() {
		return (
			<div className="d-inline-flex w-100 overflow-hidden">
				<div className="flex-grow-1">
					<h1 className="title-text">{this.name}</h1>
					<p className="title-text">{this.description}</p>
				</div>
				<div className="float-right">
					<Button variant="info" size="lg">
						<Image src={process.env.PUBLIC_URL + "/img/cards/share.png"} alt={"Share"}
							className="share-img"/>
						Share
					</Button>
				</div>
			</div>
		);
	}
}

export default RouteTitle;