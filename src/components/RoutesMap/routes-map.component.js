// @flow

import React, { Component } from "react"
import {
	Map,
	Polyline,
	TileLayer,
} from "react-leaflet"

const center = [42.7843378,-8.8879561]

const polyline = [
	[42.7843378,-8.8879561],
	[42.7840691,-8.8869087],
	[42.7788287,-8.8891135],
	[42.7751784,-8.8872668],
	[42.7740152,-8.8903451],
	[42.7731741,-8.8905436],
	[42.7706397,-8.8899538],
]

export default class RoutesMap extends Component<> {
	render() {
		return (
			<Map center={center} zoom={13}>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Polyline color="blue" positions={polyline} />
			</Map>
		)
	}
}