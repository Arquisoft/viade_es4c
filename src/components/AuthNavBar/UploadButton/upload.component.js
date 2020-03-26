import React from "react";
import SolidFileClient from "solid-file-client";
import auth from "solid-auth-client";
import Form from "react-bootstrap/Form";
import {ParserToRoute, RouteToRDF} from "../../../viade";
import {VideoViade, ImageViade} from "../../../viade";
import Button from "react-bootstrap/Button";
import ImageUploader from 'react-images-upload';
import { useWebId } from "@inrupt/solid-react-components";
import "./upload.component.css"

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
		media.push(e);
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
    
    if(webid) {
		const file = files[0];
		const rutaPod = webid.substring(0, webid.length - 16) + "/public/viade/routes/";
		const rutaMedia = webid.substring(0, webid.length - 16) + "/public/viade/media/";
			//webid -> https://usernamme.solid.community/profile/card#me
			const url = rutaPod + file.name.substr(0, file.name.indexOf(".")) + ".ttl";
			console.log(url);//La direccion a la que se subira, para asegurarse de que funciona bien
      //Empezamos a parsear el archivo


      let promise = ParserToRoute.parse(file);
      let route = await promise.then((route) => {
        return route
      });
      console.log(route);

      route.name = valueName;//Valor del campo del nombre
      route.description = valueDescription;//Valor del campo de descripcion

		// Subida de archivos
      try {
        for (let i=0; i<media[0].length; i++) {
          console.log(media[0].length);
          console.log(media[0]);
          await fc.putFile(rutaMedia + media[0][i].name, media[0][i], media[0][i].type);
          if (media[0][i].name.includes(".mp4")){
            route.videos.push(new VideoViade(rutaMedia,webid.substring(0, webid.length - 16),new Date()));
          }
          else {
            route.images.push(new ImageViade(rutaMedia,webid.substring(0, webid.length - 16),new Date()));
          }
        }
      } catch (err) {
        console.error(err);
      }


      let parserToRDF = new RouteToRDF(route);
      let strRoute = parserToRDF.parse();


		//Ya tenemos un String para meter en SolidFileClient
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
			<ImageUploader
				withIcon={true}
				withPreview={true}
				buttonText='Choose images and videos'
				onChange={mediaSelectedHadler}
				imgExtension={['.jpg', '.gif', '.png', '.gif','.mp4']}
				maxFileSize={5242880}
			/>
			{/** Botón de subida de archivo **/}
			<Button onClick={summitHandler}>Upload</Button>
		</Form>

	);
};