import React from "react";
import SolidFileClient from "solid-file-client";
import auth from "solid-auth-client";
import Form from "react-bootstrap/Form";
import {ParserToRoute, RouteToRDF,VideoViade, ImageViade,storageHelper} from "../../../viade";
import ImageUploader from "react-images-upload";
import {useWebId} from "@inrupt/solid-react-components";
import {CustomButton} from "../../";
import "./upload.component.css";
import {errorToaster,warningToaster,successToaster, infoToaster} from "../../../utils/toaster";

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
            errorToaster("You need to be logged in","FatalError");//alert("You need to be logged in");

    }else if( valueName === ""){
        warningToaster("You need to introduce a name for te route", "Warn");
    }
    else if (files == null) {
        warningToaster("You need to upload a route","Warn");
    }
    else {
        infoToaster("Uploading route");
        const file = files[0];
        const rutaPod = storageHelper.getMyRoutesFolder(webid);
        const rutaMedia = storageHelper.getMediaFolder(webid);
        //webid -> https://usernamme.solid.community/profile/card#me
        const date = Date.now();
        const url = rutaPod + date + ".ttl";

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
                    let extension="."+media[i].name.split(".").slice(-1)[0];
                    await fc.putFile(rutaMedia + date + "_" + i +extension , media[i], media[i].type);
                    if (media[i].name.includes(".mp4")) {
                        route.media.push(new VideoViade(rutaMedia + date + "_" + i +extension, webid.substring(0, webid.length - 16), new Date()));
                    } else {
                        route.media.push(new ImageViade(rutaMedia + date + "_" + i +extension, webid.substring(0, webid.length - 16), new Date()));
                    }

                }
            } catch (err) {
                throw new Error("Error in the upload of the media");
            }
            let strRoute = null;
            try{
                let parserToRDF = new RouteToRDF(route);
                strRoute = parserToRDF.parse();
                //Ya tenemos un String para meter en SolidFileClient
                if(strRoute == null)
                    throw new Error();
            }catch(err){
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
        catch (err) {//Damos feedback al usuario
            errorToaster(err.toString());
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
            <p>We don't support manual creation of routes as of yet, but you can use <a href={"http://geojson.io/"}>
                this webpage</a> to make one if you don't have a GPS.</p>
            {/** Selección de archivo **/}
            <input type="file" onChange={fileSelectedHadler}/>
            <ImageUploader
                withIcon={true}
                withPreview={true}
                buttonText='Choose images and videos'
                onChange={mediaSelectedHadler}
                imgExtension={[".jpg", ".gif", ".png", ".gif", ".mp4"]}
                maxFileSize={5242880}
            />
            {/** Botón de subida de archivo **/}
            <CustomButton onClick={summitHandler} text="Upload"/>
        </Form>

    );
};