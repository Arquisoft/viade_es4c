import React, {useState} from "react";
import {Collapse} from "react-bootstrap";
import "./routes-media-upload.css";
import {CustomButton} from "../../";
import ImageUploader from "react-images-upload";
import {errorToaster, infoToaster, successToaster, warningToaster} from "../../../utils";
import {storageHelper} from "../../../viade/util";
import {ImageViade, VideoViade} from "../../../viade/Model";
import {RouteToRDF} from "../../../viade/Parsers/ParserToRDF";
import SolidFileClient from "solid-file-client";
import auth from "solid-auth-client";

const fc = new SolidFileClient(auth);

/**
 * Collapsible containing the component to upload new media to a route
 */
const RoutesMediaUpload = (props) => {

	let media = [];

	const [isOpen, setIsOpen] = useState(false);

	const {route, webId} = props;

	const toggle = () => setIsOpen(!isOpen);

	const mediaSelectedHadler = (e) => {
		media = e;
	};

	const summitHandler = async (e) => {

		if (media.length == 0) {
			warningToaster("You need to upload a file", "Warn");
		} else {

			infoToaster("Uploading files");
			const rutaMedia = storageHelper.getMediaFolder(webId);
			//webid -> https://usernamme.solid.community/profile/card#me
			const date = Date.now();
			const url = route.url;


			// Subida de archivos
			try {
				for (let i = 0; i < media.length; i++) {
					let extension = "." + media[i].name.split(".").slice(-1)[0];
					await fc.putFile(rutaMedia + date + "_" + i + extension, media[i], media[i].type);
					if (media[i].name.includes(".mp4")) {
						route.media.push(new VideoViade(rutaMedia + date + "_" + i + extension, webId.substring(0, webId.length - 16), new Date()));
					} else {
						route.media.push(new ImageViade(rutaMedia + date + "_" + i + extension, webId.substring(0, webId.length - 16), new Date()));
					}

				}
			} catch (err) {
				throw new Error("Error in the upload of the media");
			}
			let strRoute = null;
			try {
				let parserToRDF = new RouteToRDF(route);
				strRoute = parserToRDF.parse();
				//Ya tenemos un String para meter en SolidFileClient
				if (strRoute == null) {
					throw new Error();
				}
			} catch (err) {
				throw new Error("Error in the content of the route");
			}

			try {
				//const res = await fc.putFile(url, file, file.type);
				await fc.createFile(url, strRoute, "text/turtle", {});
			} catch (err) {
				throw new Error("Error uploading files");//console.error(err); // Da warning aquí por usar la consola
			}
			successToaster("Route uploaded succesfully");
		}

	};

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
							onChange={mediaSelectedHadler}
							imgExtension={[".jpg", ".gif", ".png", ".gif", ".mp4"]}
							maxFileSize={5242880}
						/>
						<CustomButton onClick={summitHandler} text="Upload"/>
					</div>

				</Collapse>
			</div>
		);

	};

export default RoutesMediaUpload;