import React from "react";
import SolidFileClient from "solid-file-client";
import auth from "solid-auth-client";
import Form from "react-bootstrap/Form";
import {ParserToRoute, RouteToRDF} from "../../../viade";
import Button from "react-bootstrap/Button";
import { useWebId } from "@inrupt/solid-react-components";

import "./upload.component.css"

const fc = new SolidFileClient(auth);

export const UploadComponent = () => {
	const webid = useWebId();
	let files;
	let nameInput = React.createRef();//Campo nombre
	let descriptionInput = React.createRef();//campo descripcion


	let valueName = "";
	let valueDescription = "";



	const fileSelectedHadler = (e) => {
		files = e.target.files
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
		//let parser = new ParserToRoute(files[0]);

		//Empezamos a parsear el archivo
		const file = files[0];

		let promise = ParserToRoute.parse(file);
		let route = await promise.then((route) => {
			return route
		});
		console.log(route);

		route.name = valueName;//Valor del campo del nombre
		route.description = valueDescription;//Valor del campo de descripcion

		let parserToRDF = new RouteToRDF(route);
		let strRoute = parserToRDF.parse();


		//Ya tenemos un String para meter en SolidFileClient

		if(webid) {
			const rutaPod = webid.substring(0, webid.length - 16) + "/public/viade/";
			//webid -> https://usernamme.solid.community/profile/card#me
			const url = rutaPod + file.name + ".ttl";
			console.log(url);//La direccion a la que se subira, para asegurarse de que funciona bien
			try {
				//const res = await fc.putFile(url, file, file.type);
				const res = await fc.createFile(url, strRoute, "text/turtle", {});//
				console.log(res)
			} catch (err) {
				console.error(err); // Da warning aquí por usar la consola
			}
		}else alert("Es necesario estar logeado");
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
			{/** Botón de subida de archivo **/}
			<Button onClick={summitHandler}>Upload</Button>
		</Form>

	);
};