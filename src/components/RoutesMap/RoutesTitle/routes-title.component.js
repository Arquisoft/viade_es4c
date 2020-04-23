import React, {Component} from "react";
import "./routes-title.css";
import {CustomModal} from "../../";
import ShareComponent from "../../Share";

/**
 * Component featuring the route information
 */
class RouteTitle extends Component {

	constructor(props) {
		super(props);
		this.route=props.route;
		this.name = props.route.name;
		this.description = props.route.description;
		this.share = props.share;
		this.webId = props.webId;
	}

	render() {
		return (
			<div className="d-inline-flex w-100 overflow-hidden">
				<div className="flex-grow-1">
					<h1 className="title-text">{this.name}</h1>
					<p className="title-text">{this.description}</p>
				</div>
				{ this.share
					?	<div className="float-right">
							<CustomModal text="Share" img="/img/buttons/share.png" component={<ShareComponent route={this.route} webId={this.webId}/>}/>
						</div>
					: 	null	}
			</div>
		);
	}
}

export default RouteTitle;