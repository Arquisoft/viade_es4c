import React, {Component} from "react";
import "./routes-title.css";
import {CustomButton} from "../../";

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
					<CustomButton text="Share" img="/img/buttons/share.png"/>
				</div>
			</div>
		);
	}
}

export default RouteTitle;