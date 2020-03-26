import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./routes-carousel.component.css";


/**
 * Slide with the images of the route
 */
class RoutesCarousel extends React.Component {

	data = [
		{ src: "/img/inrupt.svg", name: "Imagen 1", description: "Description"},
		{ src: "/img/logo.svg", name: "Imagen 2", description: "Description"},
		{ src: "/img/Solid.svg", name: "Imagen 3", description: "Description"}
	];

	render() {
		return (
			<Carousel interval={0}>
				{this.data.map(function(object){
					return <Carousel.Item>
						<img
							className="d-block route-img"
							src={object.src}
							alt={object.name}
						/>
						<Carousel.Caption>
							<h3>{object.name}</h3>
							<p>{object.description}</p>
						</Carousel.Caption>
					</Carousel.Item>;
				})}
			</Carousel>
		);
	}

}

export default RoutesCarousel;

