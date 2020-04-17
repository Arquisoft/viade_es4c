import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./routes-carousel.component.css";


/**
 * Slide with the images of the route
 */
class RoutesCarousel extends React.Component {

	constructor(props) {
		super(props);
		this.data = props.media;
	}

	render() {
		return (
			<Carousel interval={5000}>
				{this.data.map(function (object) {
					return (
						<Carousel.Item key={object.getUrl()}>
							{object.getComponent()}
						</Carousel.Item>);
				})}
			</Carousel>
		);
	}

}

export default RoutesCarousel;

