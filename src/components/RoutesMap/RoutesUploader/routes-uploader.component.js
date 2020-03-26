import React, {Component} from "react";
import "./routes-uploader.css";

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
				<h1 className="uploader-text">{this.name}</h1>
				<p className="uploader-text">{this.description}</p>
			</div>
		);
	};
}

export default RouteUploader;