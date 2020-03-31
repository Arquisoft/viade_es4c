import React, {Suspense} from "react";
import {Image} from "react-bootstrap";
import "./cards.css";
import {RouteCardLoaderComponent} from "./card-loader.component";

export const RouteCardComponent = (props) => {

	return (
		<Suspense fallback={<RouteCardLoaderComponent/>}>
			<div className="card">
				<div className="card-left">
					<Image src={process.env.PUBLIC_URL + "/img/routes/route.png"} alt={"Route"}
						   className="card-image"/>
					<div className="card-extra">
						<h3>{props.name}</h3>
						<p className="card-p">{props.desc}</p>
						<div className="card-link">
							Show
						</div>
					</div>
				</div>
				<div className="card-right">
					<h3>{props.name}</h3>
					<p className="card-p">{props.desc}</p>
				</div>
			</div>
		</Suspense>
	);


};