import React, {Component} from "react";
import {Map, Polyline, TileLayer, Marker} from "react-leaflet";

let polyline = [];

export default class RouteMap extends Component<> {

	constructor(props) {
		super(props);
		polyline = [];
		this.props.route.items.forEach((item) => polyline.push([item.latitude,item.longitude]));
	}

	getBounds() {
		let north = Math.max.apply(null, polyline.map(x => x[0]));
		let east = Math.max.apply(null, polyline.map(x => x[1]));
		let south = Math.min.apply(null, polyline.map(x => x[0]));
		let west = Math.min.apply(null, polyline.map(x => x[1]));
		return {north: north, east: east, south: south, west: west};
	}

	getCenter() {
		let bounds = this.getBounds();
		return [(bounds.north+bounds.south)/2, (bounds.east+bounds.west)/2];
	}

	getZoomLevel() {
		let WORLD_DIM = { height: 256, width: 256 };
		let ZOOM_MAX = 20;

		function latRad(lat) {
			let sin = Math.sin(lat * Math.PI / 180);
			let radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
			return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
		}

		function zoom(mapPx, worldPx, fraction) {
			return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
		}

		let bounds = this.getBounds();
		let lngDiff = bounds.east - bounds.west;

		let latFraction = (latRad(bounds.north) - latRad(bounds.south)) / Math.PI;
		let lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

		let latZoom = zoom(500, WORLD_DIM.height, latFraction);
		let lngZoom = zoom(500, WORLD_DIM.width, lngFraction);

		return Math.min(latZoom, lngZoom, ZOOM_MAX);
	}

	render() {
		return (
			<Map center={this.getCenter()} zoom={this.getZoomLevel()}>
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