//COmponentes generales
//Componentes React
import React from "react";
import {Link} from "react-router-dom";
//Librerias
import auth from "solid-auth-client";
import FC from "solid-file-client";
import {RDFToRoute} from "../../viade";
import {Col, Row} from "react-bootstrap";
import {RouteCard} from "../../components";

class FriendsRoutesComponent extends React.Component {
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
		let sessionString = session.split("profile")[0] + "public/viade";

		let json = await this.obtainRoutesName(fc, sessionString);
		this.obtainRoutes(json);
	}

	async obtainRoutesName(fc, sessionString) {
		// Obtengo los nombres de los archivos
		let filesString = "";
		try {
			filesString = await fc.readFile(sessionString + "/shared_with_me.txt");
			return JSON.parse(filesString);
		} catch {
			return null;
		}

	}

	async obtainRoutes(json) {
		// Con los nombres de los archivos, los obtengo y los parseo de RDF a Route
		if (!json) {
			return;
		}
		let aux = [];
		for (let r of json.rutas) {
			let promise = RDFToRoute.parse(r);
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

export default FriendsRoutesComponent;