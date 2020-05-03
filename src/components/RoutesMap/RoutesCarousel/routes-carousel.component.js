import React from "react";
import {Image, Carousel} from "react-bootstrap";
import "./routes-carousel.component.css";


/**
 * Slide with the images of the route
 */
class RoutesCarousel extends React.Component {

	/**
	 * Loads the data to display from the props
	 * @param props
	 * 			media, images and videos to show
	 */
	constructor(props) {
		super(props);
		this.data = props.media;
	}

	render() {
		return (
			this.data.length > 0 ?
				<Carousel interval={5000}>
					{this.data.map(function (object) {
						return (
							<Carousel.Item key={object.getUrl()}>
								{object.getComponent()}
							</Carousel.Item>);
					})}
				</Carousel>
			: 	<div className={"no-media"}>
					{/* If the route has no media, it advises it */}
					<Image src={process.env.PUBLIC_URL + "/img/advises/nomedia.png"}/>
					<h3>This route doesn't have any attached media</h3>
				</div>
		);
	}

}

export default RoutesCarousel;

