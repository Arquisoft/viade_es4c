import React from "react";
import {Link} from "react-router-dom";
import auth from "solid-auth-client";
import FC from "solid-file-client";
import {RDFToRoute} from "../../viade";
import {Col, Row} from "react-bootstrap";
import {RouteCard} from "../../components/";


class MyRoutesComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			routes: []
		};
	}

	async componentDidMount() {
		const fc = new FC(auth); //With fc we can manage files

		// Obtengo el link de la sesion
		let session = (await auth.currentSession()).webId;
		let sessionString = session.split("profile")[0] + "public/viade/routes";

		let routesName = await this.obtainRoutesName(fc, sessionString);
		this.obtainRoutes(sessionString, routesName);
	}

	async obtainRoutesName(fc, sessionString) {
		// Obtengo los nombres de los archivos
		if (!await fc.itemExists(sessionString)) {
			//console.error("no se escuentra la carpeta viade");
			return [];
		}
		let folder = await fc.readFolder(sessionString);
		return folder.files;
	}

	async obtainRoutes(sessionString, routesName) {
		// Con los nombres de los archivos, los obtengo y los parseo de RDF a Route
		let aux = [];
		for (let r of routesName) {
			let promise = RDFToRoute.parse(sessionString + "/" + r.name);
			let route = await promise.then((result) => result);
			aux.push(route);
		}
		this.setState({routes: aux});
	}

	render() {
		return (
			<div>
				<Row className="justify-content-md-center">
					<Col key="col-1" xs={12} sm={12} md={12} lg={2} xl={2}/>
					<Col key="col-2" xs={12} sm={12} md={12} lg={8} xl={8}>
						<Row>
							{this.state.routes.map((obj) => (
								<Col md={12} lg={4}>
									<Link key={obj.name} className="card-a" to={{
										pathname: "/showRoute",
										state: {
											route: obj
										}
									}}>
										<RouteCard name={obj.name} desc={obj.description} media={obj.media}/>
									</Link>
								</Col>
							))}
						</Row>
					</Col>
					<Col key="col-3" xs={12} sm={12} md={12} lg={2} xl={2}/>
				</Row>
			</div>
		);
	}
}

export default MyRoutesComponent;
