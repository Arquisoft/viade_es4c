import React from "react";
import SolidFileClient from "solid-file-client";
import auth from "solid-auth-client";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import {ParserToRoute, RouteToRDF} from "../../viade";
import Button from "react-bootstrap/Button";

const fc = new SolidFileClient(auth);

export const UploadComponent = () => {
	//const webid = useWebId();
	let files;
	let textInput = React.createRef();
	let value = "";


	const fileSelectedHadler = (e) => {
		files = e.target.files
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
		let parserToRDF = new RouteToRDF(route);
		let strRoute = parserToRDF.parse();


		//Ya tenemos un String para meter en SolidFileClient

		const rutaPod = value + ((value.endsWith('/')) ? '' : '/');// + ((textInput.current.select().endsWith('/')) ? '' : '/')
		const url = rutaPod + file.name + ".ttl";
		console.log(url);//La direccion a la que se subira, para asegurarse de que funciona bien
		try {
			//const res = await fc.putFile(url, file, file.type);
			const res = await fc.createFile(url, strRoute, "text/turtle", {});//
			console.log(res)
		} catch (err) {
			console.error(err); // Da warning aquí por usar la consola
		}
		//setUploadStatus(false)//terminamos de subir
	};

	const handleChange = () => {
		value = textInput.current.value;

	};

	return (


		<Form>
			{/** Campo del nombre **/}
			<Form.Group controlId="formName">
				<Form.Label>Name:</Form.Label>
				<Form.Control type="text" placeholder="Enter the name of the route"/>
			</Form.Group>
			{/** Campo de la descripción**/}
			<Form.Group controlId="formDescription">
				<Form.Label>Description:</Form.Label>
				<Form.Control as="textarea" placeholder="Enter the description of the route"/>
				<Form.Text className="text-muted">
					(Optional)
				</Form.Text>
			</Form.Group>
			{/** Campo de la ruta de almacenamiento **/}
			<InputGroup className="mb-3">
				<InputGroup.Prepend>
					<InputGroup.Text id="basic-addon1">Folder</InputGroup.Text>
				</InputGroup.Prepend>
				<Form.Control ref={textInput} onChange={() => handleChange()}
							  placeholder="https://username.solid.community/folder/"
							  aria-label="https://username.solid.community/folder/"
							  aria-describedby="basic-addon1"
				/>
			</InputGroup>
			{/** Selección de archivo **/}
			<input type="file" onChange={fileSelectedHadler}/>
			{/** Botón de subida de archivo **/}
			<Button onClick={summitHandler}>Upload</Button>
		</Form>

	);
};