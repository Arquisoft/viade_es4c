import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./routes-carousel.component.css";


/**
 * Slide with the images of the route
 */
class RoutesCarousel extends React.Component {

	data = [
		{ src: "/img/inrupt.svg", date: "Imagen 1", description: "Description"},
		{ src: "/img/logo.svg", date: "Imagen 2", description: "Description"},
		{ src: "/img/Solid.svg", date: "Imagen 3", description: "Description"}
	];

	render() {
		return (
			<Carousel interval={5000}>
				{this.data.map(function(object){
					return <Carousel.Item key={object.src}>
						<img
							className="d-block route-img"
							src={object.src}
							alt={object.date}
						/>
						<Carousel.Caption>
							<h3>{object.date}</h3>
						</Carousel.Caption>
					</Carousel.Item>;
				})}
			</Carousel>
		);
	}

}

export default RoutesCarousel;

