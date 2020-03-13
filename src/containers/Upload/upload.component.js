import React from "react";
import SolidFileClient from "solid-file-client";
import auth from "solid-auth-client";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import {ParserToRoute} from "../../viade";
import {RouteToRDF} from "../../viade";

const fc = new SolidFileClient(auth);

export const UploadComponent = () => {
    //const webid = useWebId();
    let files;
    let textInput = React.createRef();
    let value  = "";


    const fileSelectedHadler = (e) => {
        files = e.target.files
    }

    const summitHandler = async(e) => {
        e.preventDefault();
        //setUploadStatus(true)//empezamos a subir
        //let parser = new ParserToRoute(files[0]);

        //Empezamos a parsear el archivo
        const file = files[0];

        let promise = ParserToRoute.parse(file);
        let route=await promise.then((route)=>{return route});
        let parserToRDF = new RouteToRDF(route);
        let strRoute = parserToRDF.parse();

        //Ya tenemos un String para meter en SolidFileClient

        const rutaPod = value;// + ((textInput.current.select().endsWith('/')) ? '' : '/')//"https://tovarashi.solid.community/public/test/"//esto esta fixeado
        const url = rutaPod + "prueba01.ttl";//file.name;
        alert(url);//Esto es debugeo pasar a console.log cuando esto funcione mejor
        try{
            //const res = await fc.putFile(url, file, file.type);
            const res = await fc.createFile(url, strRoute, "text/plain",{});
            console.log(res)
        }catch(err){
            console.error(err); // Da warning aquí por usar la consola
        }
        //setUploadStatus(false)//terminamos de subir
    }

    const handleChange =  () => {
        value = textInput.current.value;

    }

    return (
        //<NavBar webId={webID}/>

        <div className="upload">
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Folder</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl ref={textInput} onChange={() => handleChange()}
                             placeholder="https://username.solid.community/folder/"
                             aria-label="https://username.solid.community/folder/"
                             aria-describedby="basic-addon1"
                />
            </InputGroup>
            <input type="file" onChange={fileSelectedHadler}/>
            <button onClick={summitHandler}>Upload</button>

        </div>

    );
};