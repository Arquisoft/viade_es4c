import React, {Component} from "react";
import "./routes-uploader.css";

const uploader = "Uploader Name";
const date = "01/01/2077";

/**
 * Component featuring the route information
 */
class RouteUploader extends Component {

	constructor(props) {
		super(props);
		this.name = props.route.name;
		this.description = props.route.description;
	}

	render() {
		return (
			<div className="route-uploader">
				<p className="uploader-text d-inline-block"><span
					className="font-weight-bold">{uploader}</span> - {this.name}</p>
				<p className="uploader-text float-right d-inline-block font-italic">{date}</p>
				<p className="uploader-text">{this.description}</p>
			</div>
		);
	};
}

export default RouteUploader;