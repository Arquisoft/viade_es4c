import React, {useState} from "react";
import {Collapse} from "react-bootstrap";
import "./routes-media-upload.css";
import {CustomButton} from "../../";
import ImageUploader from "react-images-upload";

/**
 * Collapsible containing the component to upload new media to a route
 */
const RoutesMediaUpload = (props) => {

	const [isOpen, setIsOpen] = useState(false);

	const {route, webId} = props;

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			{console.log(route)}
			{console.log(webId) // <-- Son para eludir las compilaciones con warning
			}
			<CustomButton onClick={toggle} text="Upload media" className="dropdown-toggle w-100"/>
			<Collapse in={isOpen}>
				<div>
					<ImageUploader
						withIcon={true}
						withPreview={true}
						buttonText='Choose images and videos'
						//onChange={mediaSelectedHadler} <-- Supongo que aquí va la funcionalidad
						imgExtension={[".jpg", ".gif", ".png", ".gif", ".mp4"]}
						maxFileSize={5242880}
					/>
				</div>
			</Collapse>
		</div>
	);

};

export default RoutesMediaUpload;