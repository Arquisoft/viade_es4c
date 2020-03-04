import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./routes-videos.component.css";


/**
 * Slide with the videos of the route
 */
class RoutesVideosComponent extends React.Component {

	data = [
		{ src: "/img/mov_bbb.mp4", name: "Video 1"},
		{ src: "/img/mov_bbb.mp4", name: "Video 2"},
		{ src: "/img/mov_bbb.mp4", name: "Video 3"}
	];

	render() {
		return (
			<Carousel interval={0}>
				{this.data.map(function(object){
					return <Carousel.Item>
						<video controls className="d-block route-img">
							<source src={object.src}/>
						</video>
					</Carousel.Item>;
				})}
			</Carousel>
		);
	}

}

export default RoutesVideosComponent;

