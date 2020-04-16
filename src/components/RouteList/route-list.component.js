import React, {useState} from "react";
import RouteItem from "./RouteItem";
import {Col, Row} from "react-bootstrap";

const RouteList = (props) => {
	const [urlRoutes, setUrlRoutes] = useState();
	const {readRoutes, webId, share} = props;

	const initRoutes = async () => {
		if (urlRoutes) {
			return;
		}
		try {
			let urls = await readRoutes();
			setUrlRoutes(urls);
		} catch (error) {
			console.error(error);
		}
	};
	initRoutes();
	return (<div>
		<Row className="justify-content-md-center">
			<Col key="col-1" xs={12} sm={12} md={12} lg={1} xl={1}/>
			<Col key="col-2" xs={12} sm={12} md={12} lg={10} xl={10}>
				<Row>
					{(urlRoutes && urlRoutes.length > 0) ?
						urlRoutes.map((url, pos) =>
							<RouteItem key={pos} url={url} webId={webId} share={share}/>
						) :
						<h4 style={{textAlign: "center", margin: "15px 0 0 0", width: "100%"}}>
							Sadly, you don't have routes to show here yet :(
						</h4>
					}
				</Row>
			</Col>
			<Col key="col-3" xs={12} sm={12} md={12} lg={1} xl={1}/>
		</Row>
	</div>);
};

export default RouteList;

