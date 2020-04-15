import React from "react";
import SolidFileClient from "solid-file-client";
import auth from "solid-auth-client";
import Form from "react-bootstrap/Form";
import {ParserToRoute, RouteToRDF} from "../../../viade";
import {VideoViade, ImageViade} from "../../../viade";
import ImageUploader from "react-images-upload";
import { useWebId } from "@inrupt/solid-react-components";
import {CustomButton} from "../../";
import "./upload.component.css";

const fc = new SolidFileClient(auth);

export const UploadComponent = () => {
	const webid = useWebId();
	let files;
	let media = [];
	let nameInput = React.createRef();//Campo nombre
	let descriptionInput = React.createRef();//campo descripcion


	let valueName = "";
	let valueDescription = "";



	const fileSelectedHadler = (e) => {
		files = e.target.files;
	};
	const mediaSelectedHadler = (e) => {
		media = e;
	};
	const handleNameChange = () => {
		valueName = nameInput.current.value;
	};
	const handleDescriptionChange = () => {
		valueDescription = descriptionInput.current.value;
	};

	const summitHandler = async (e) => {
		e.preventDefault();
		//setUploadStatus(true)//empezamos a subir

	if(!webid) {
		alert("You need to be logged in");
	}
	else if (files === null) {
		alert("You need to upload a route");
	}
	else {
		const file = files[0];
		console.log(file);
		const rutaPod = webid.substring(0, webid.length - 16) + "/public/viade/routes/";
		const rutaMedia = webid.substring(0, webid.length - 16) + "/public/viade/media/";
			//webid -> https://usernamme.solid.community/profile/card#me
			const url = rutaPod + file.name.substr(0, file.name.indexOf(".")) + ".ttl";

		//Empezamos a parsear el archivo
		try {
			let promise = ParserToRoute.parse(file);
			let route = await promise.then((route) => {
				return route;
			});

			route.name = valueName;//Valor del campo del nombre
			route.description = valueDescription;//Valor del campo de descripcion

			// Subida de archivos
			try {
				for (let i = 0; i < media.length; i++) {
					await fc.putFile(rutaMedia + media[i].name, media[i], media[i].type);
					if (media[i].name.includes(".mp4")) {
						route.media.push(new VideoViade(rutaMedia, webid.substring(0, webid.length - 16), new Date()));
					} else {
						route.media.push(new ImageViade(rutaMedia, webid.substring(0, webid.length - 16), new Date()));
					}

				}
			} catch (err) {
				alert("Error en la subida de archivos");
				console.error(err);
			}

			let parserToRDF = new RouteToRDF(route);
			let strRoute = parserToRDF.parse();


			//Ya tenemos un String para meter en SolidFileClient
			try {
				//const res = await fc.putFile(url, file, file.type);
				await fc.createFile(url, strRoute, "text/turtle", {});
			} catch (err) {
				alert("Error uploading files");//console.error(err); // Da warning aquí por usar la consola
			}
		}
		catch (err) {
			alert(err.toString());
		}

	}
			//setUploadStatus(false)//terminamos de subir
	};



	return (

		<Form>
			{/** Campo del nombre **/}
			<Form.Group controlId="formName">
				<Form.Label>Name:</Form.Label>
				<Form.Control ref={nameInput} onChange={() => handleNameChange()}
							type="text" placeholder="Enter the name of the route"/>
			</Form.Group>
			{/** Campo de la descripción**/}
			<Form.Group controlId="formDescription">
				<Form.Label>Description:</Form.Label>
				<Form.Control ref={descriptionInput} onChange={() => handleDescriptionChange()}
							as="textarea" placeholder="Enter the description of the route"/>
				<Form.Text className="text-muted">
					(Optional)
				</Form.Text>
			</Form.Group>
			{/** Selección de archivo **/}
			<input type="file" onChange={fileSelectedHadler}/>
			<ImageUploader
				withIcon={true}
				withPreview={true}
				buttonText='Choose images and videos'
				onChange={mediaSelectedHadler}
				imgExtension={[".jpg", ".gif", ".png", ".gif",".mp4"]}
				maxFileSize={5242880}
			/>
			{/** Botón de subida de archivo **/}
			<CustomButton onClick={summitHandler} text="Upload"/>
		</Form>

	);
};