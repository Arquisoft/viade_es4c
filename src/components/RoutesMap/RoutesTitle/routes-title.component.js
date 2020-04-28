import React, {Component} from "react";
import "./routes-title.css";
import {CustomButton, CustomModal} from "../../";
import ShareComponent from "../../Share";

/**
 * Component featuring the route information
 */
class RouteTitle extends Component {

	/**
	 * The page receives the route and will show its name and description
	 * @param props	Containing the route to display, its webId and if the route is sharable
	 */
	constructor(props) {
		super(props);
		this.route=props.route;
		this.name = props.route.name;
		this.description = props.route.description;
		this.share = props.share;
		this.webId = props.webId;
		this.state = {
			isEditing: false,
			editedName: this.name,
			editedDescription: this.description
		};
	};

	/**
	 * Changes the name and description to be modifiable
	 */
	edit = () => { this.setState({isEditing: true}); };

	/**
	 * Saves the route with the modified fields
	 */
	save = () => {
		this.setState({isEditing: false});
		this.name = this.state.editedName;
		this.description = this.state.editedDescription;
		// TODO persist the changes
	};

	/**
	 * Updates the name/description of the item
	 * @param evt
	 */
	updateName = (evt) => { this.setState( {editedName: evt.target.value}) };
	updateDescription = (evt) => { this.setState( {editedDescription: evt.target.value}) };

	handleKeyEnter = (e) => {
		if (e.key === "Enter" && this.state.isEditing) {
			this.save();
		}
		if (e.key === "Escape" && this.state.isEditing) {
			this.setState( {editedName: this.name});
			this.setState( {editedDescription: this.description});
			this.setState({isEditing: false});
		}
	};

	render() {
		return (
			<div className="d-inline-flex w-100 overflow-hidden">
				<div className="flex-grow-1">
					{(this.state.isEditing)
						? 	<div className={"flex-grow-1"}>
								<input type={"text"} className="edit edit-title" onKeyDown={this.handleKeyEnter}
									value={this.state.editedName} onChange={this.updateName}/>
							</div>
						: 	<h1 className="title-text">{this.name}</h1>}
					{(this.state.isEditing)
						? 	<div className={"flex-grow-1"}>
								<input type={"text"}  className="edit" onKeyDown={this.handleKeyEnter}
									value={this.state.editedDescription} onChange={this.updateDescription}/>
							</div>
						: 	<p className="title-text">{this.description}</p>}
				</div>

				{ this.share
					?	<div>
							{(this.state.isEditing)
								? <CustomButton onClick={this.save} img="/img/buttons/save.png"/>
								: <CustomButton onClick={this.edit} img="/img/buttons/edit.png"/> }
							<div className="float-right">
								<CustomModal text="Share" img="/img/buttons/share.png"
										 component={<ShareComponent route={this.route} webId={this.webId}/>}/>
							</div>
						</div>
					: 	null	}
			</div>
		);
	}
}

export default RouteTitle;