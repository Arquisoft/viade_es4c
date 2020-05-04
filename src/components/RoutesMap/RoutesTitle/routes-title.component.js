import React, {Component} from "react";
import SolidFileClient from "solid-file-client";
import auth from "solid-auth-client";
import "./routes-title.css";
import {CustomButton, CustomModal} from "../../";
import ShareComponent from "../../Share";
import {RouteToRDF,storageHelper} from "../../../viade";
import {errorToaster,successToaster} from "../../../utils/toaster";

/**
 * Component featuring the route information
 */
class RouteTitle extends Component {

	/**
	 * The page receives the route and will show its name and description
	 * @param props
	 * 			route, with the info to show, edit or share
	 * 			share, indicates if the routes is sharable and editable
	 * 			webId, webId of the user
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
	}

	/**
	 * Changes the name and description to be modifiable
	 */
	edit = () => { this.setState({isEditing: true}); };

	/**
	 * Saves the route with the modified fields
	 */
	save = async () => {
		this.setState({isEditing: false});
		this.name = this.state.editedName;
		this.description = this.state.editedDescription;
		if ( this.route.name !== this.name || this.route.description !== this.description) {
			this.route.name = this.name;
			this.route.description = this.description;

			let parserToRDF = new RouteToRDF(this.route);
			//Parsear la ruta a RDF
			let strRoute = parserToRDF.parse();

			//alert(this.route.url); https://viadees4c.solid.community/viade/routes/1587668614753.ttl

			const rutaPod = storageHelper.getMyRoutesFolder(this.webId); //
			//alert(this.webId); //https://viadees4c.solid.community/profile/card#me
			const aux = this.route.url.split("/");
			const nombreRuta = aux[aux.length - 1];
			const url = rutaPod + nombreRuta;//no tiene sentido quitar el .ttl para luego volver a ponerlo :)
			//alert(nombreRuta);


			//Subir La ruta
			try {
				const fc = new SolidFileClient(auth);//creamos el objeto solid file client
				await fc.createFile(url, strRoute, "text/turtle", {});

				successToaster("Route modified successfully");

			} catch (e) {
				errorToaster("Error in the modification");
			}
		}
	};

	/**
	 * Updates the name/description of the item
	 * @param evt		Event triggering the update
	 */
	updateName = (evt) => { this.setState( {editedName: evt.target.value}); };
	updateDescription = (evt) => { this.setState( {editedDescription: evt.target.value}); };

	/**
	 * Function to hold the Enter (save) and Escape (abort) actions
	 * @param e
	 */
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
					{/* Name of the route, it's an input if editing */}
					{(this.state.isEditing)
						? 	<div className={"flex-grow-1"}>
								<input type={"text"} className="edit edit-title" onKeyDown={this.handleKeyEnter}
									value={this.state.editedName} onChange={this.updateName}/>
							</div>
						: 	<h1 className="title-text">{this.name}</h1>}
					{/* Description of the route, it's an input if editing */}
					{(this.state.isEditing)
						? 	<div className={"flex-grow-1"}>
								<input type={"text"}  className="edit" onKeyDown={this.handleKeyEnter}
									value={this.state.editedDescription} onChange={this.updateDescription}/>
							</div>
						: 	<p className="title-text">{this.description}</p>}
				</div>
				{/* Share and edit buttons, only visible when the route is owned */}
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