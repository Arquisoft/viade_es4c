import React, {Component} from "react";
import {Map, Polyline, TileLayer, Marker} from "react-leaflet";

let center = [];
let polyline = [];

export default class RouteMap extends Component<> {

	constructor(props) {
		super(props);
		this.props.route.items.forEach((item) => polyline.push([item.latitude,item.longitude]));
		center = polyline[Math.round(polyline.length/2)];
	}

	render() {
		return (
			<Map center={center} zoom={14}>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={polyline[0]}/>
				<Polyline color="blue" positions={polyline} />
				<Marker position={polyline[polyline.length-1]}/>
			</Map>
		);
	}
}