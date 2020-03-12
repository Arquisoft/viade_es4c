import React from "react";
import SolidFileClient from "solid-file-client";
import auth from "solid-auth-client";
import $ from "jquery";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import {ParserToRoute} from "../../viade/ParserToRoute";

// const auth = require('/node_modules/solid-auth-client')
//const FileClient = require('/node_modules/solid-file-client')
//const fc = new FileClient(auth)
const fc = new SolidFileClient(auth);

//const local  = "file://" + process.cwd() + "/square.png"
//const local  = "file://C:\\Users\\arvo\\WebstormProjects\\viade_es4c\\public\\tmp\\"
// const remote = "https://Tovarashi.solid.community/public/example.jpg";
// const local  = "file:///C:/Users/arvo/WebstormProjects/viade_es4c/src/containers/Upload/example.jpg";
//const local = "file://" + process.cwd() + "/example.jpg"



/*async function fileUploadToReactHandler(){
    let session = await auth.currentSession();
    if (!session) { alert("No estas logeado") }
    else {
        //console.log(`Logged in as ${session.webId}.`);
        alert("estas logeado");
        //console.log(local);
        await fc.copyFile( local, remote );
    }
}*/




export const UploadComponent = () => {
    //const webid = useWebId();
    //setUploadStatus(false)
    //<button onClick={fileUploadToReactHandler}>UploadToReact</button>
    let files;
    let textInput = React.createRef();
    let value  = "";




    const setUploadStatus = (isUploading) => {

        if (isUploading) {
            $(".not-uploading").hide();
            $(".uploading").show();
        } else {
            $(".not-uploading").show();
            $(".uploading").hide();
        }
    }
    const fileSelectedHadler = (e) => {
        files = e.target.files
    }



    const summitHandler = async(e) => {
        e.preventDefault();
        //setUploadStatus(true)//empezamos a subir
        let parser = ParserToRoute(files[0]);
        parser.selectParser(files[0]);
        let route = parser.parse();
        const file = files[0];

        //const parentContainer =
        const parentContainer = value;// + ((textInput.current.select().endsWith('/')) ? '' : '/')//"https://tovarashi.solid.community/public/test/"//esto esta fixeado
        const url = parentContainer + file.name;
        alert(url);
        try{
            const res = await fc.putFile(url, file, file.type);
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
        //<input type="file" onChange={fileSelectedHadler}/>
        //<button onClick={fileUploadHandler}>UploadToPc</button>

        <div className="upload" onLoad={setUploadStatus(false)}>
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