import React from "react";
import {notificationHelper,errorToaster} from "../../../../utils";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

class NotificationItem extends React.Component{
	constructor(props){
		super(props);
		const {url, webId, setSharing, isSharing} = props;
		this.url=url;
		this.webId=webId;
		this.setSharing=setSharing;
		this.isSharing=isSharing;
		this.state={};
	}

	init = async () => {
		if(this.state.notification){
			return;
		}
		const notification=await notificationHelper.fetchNotification(this.url);
		this.setState({notification:notification});
		errorToaster("HOLA","HOLA",{});
	}

	addSharedWithMe = async (notification) => {	
		if(!notification){
			return;
		}
		if (!notification.read) {
			this.setSharing(true);
			await notificationHelper.addRouteSharedWithMe(notification.object, this.webId);
			await notificationHelper.markAsRead(notification);
			this.setSharing(false);
		}
	};


	render(){
	this.init();
	return (
		<div>
		{this.state.notification ?
			<Card style={{margin: "0px 0px 10px 0px", width: "50%"}}>
			<Card.Header>
                <h4 className="d-inline-block">{this.state.notification.title}</h4>
                {!this.state.notification.read ?
                    <Button disabled={this.isSharing} onClick={() => this.addSharedWithMe(this.state.notification)}
                        className="float-right d-inline-block">
                        Accept Route
                    </Button> : null}
			</Card.Header>
			<ListGroup variant="flush">
				<ListGroup.Item>From: {this.state.notification.actor.toString()
					.substr(8, this.state.notification.actor.toString().length - 40)}</ListGroup.Item>
				<ListGroup.Item>Route: {this.state.notification.object.toString().split("/").pop()}</ListGroup.Item>

			</ListGroup>
		</Card>
		:null}
		</div>
	);
				}
}

export default NotificationItem;
