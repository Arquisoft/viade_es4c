import React,{Component} from  "react";
import {Link, NavLink} from 'react-router-dom';
import { useWebId } from "@inrupt/solid-react-components";
import {NavBar} from "../../components";
import UploadButton from "./upload.button.component";
import SolidFileClient from "solid-file-client"
import auth from "solid-auth-client"
import $ from "jquery"


// const auth = require('/node_modules/solid-auth-client')
//const FileClient = require('/node_modules/solid-file-client')
//const fc = new FileClient(auth)
const fc = new SolidFileClient(auth)

//const local  = "file://" + process.cwd() + "/square.png"
//const local  = "file://C:\\Users\\arvo\\WebstormProjects\\viade_es4c\\public\\tmp\\"
const remote = "https://Tovarashi.solid.community/public/example.jpg"
const local  = "file:///C:/Users/arvo/WebstormProjects/viade_es4c/src/containers/Upload/example.jpg"
//const local = "file://" + process.cwd() + "/example.jpg"



async function fileUploadToReactHandler(){
    alert("upload")
    let session = await auth.currentSession()
    if (!session) { alert("No estas logeado") }
    else {
        console.log(`Logged in as ${session.webId}.`)
        alert("estas logeado")
        console.log(local);
        await fc.copyFile( local, remote )
    }
}




export const UploadComponent = () => {
    //const webid = useWebId();
    //setUploadStatus(false)
    //<button onClick={fileUploadToReactHandler}>UploadToReact</button>
    let files

    const setUploadStatus = isUploading => {

        if (isUploading) {
            $('.not-uploading').hide()
            $('.uploading').show()
        } else {
            $('.not-uploading').show()
            $('.uploading').hide()
        }
    }
    const fileSelectedHadler= e => {
        files = e.target.files
    }



    const summitHandler = async(e) => {
        e.preventDefault()
        //setUploadStatus(true)//empezamos a subir
        const file = files[0]
        //const parentContainer =
        const parentContainer = "https://tovarashi.solid.community/public/test/"//esto esta fixeado
        const url = parentContainer + file.name
        try{
            const res = await fc.putFile(url, file, file.type)
        }catch(err){
            console.error(err)
        }
        //setUploadStatus(false)//terminamos de subir
    }



    return (
        //<NavBar webId={webID}/>
        //<input type="file" onChange={fileSelectedHadler}/>
        //<button onClick={fileUploadHandler}>UploadToPc</button>

        <div className="upload" onLoad={setUploadStatus(false)}>
            <input type="file" onChange={fileSelectedHadler}/>
            <button onClick={summitHandler}>Upload</button>

        </div>

    );
};