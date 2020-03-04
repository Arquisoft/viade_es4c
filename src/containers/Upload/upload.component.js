import React,{Component} from  'react';
import {Link, NavLink} from 'react-router-dom';
import { useWebId } from "@inrupt/solid-react-components";
import {NavBar} from "../../components";

import SolidFileClient from 'solid-file-client'
import auth from 'solid-auth-client'



// const auth = require('/node_modules/solid-auth-client')
//const FileClient = require('/node_modules/solid-file-client')
//const fc = new FileClient(auth)
const fc = new SolidFileClient(auth)

//const local  = "file://" + process.cwd() + "/square.png"
//const local  = "file://C:\\Users\\arvo\\WebstormProjects\\viade_es4c\\public\\tmp\\"
const remote = "https://Tovarashi.solid.community/public/example.jpg"
const local  = "file:///C:/Users/arvo/WebstormProjects/viade_es4c/src/containers/Upload/example.jpg"
//const local = "file://" + process.cwd() + "/example.jpg"





async function fileUploadToReactHandler2() {

    console.log("file://"+ process.cwd() +"/example.jpg")

    try {
        alert("Intendo de logearse")
        console.log(auth.currentSession())
        //await auth.login()
        await fc.copyFile( local, remote )
    }
    catch(err) {
        console.log(err)
    }
}


async function fileUploadToReactHandler(){
    let session = await auth.currentSession()
    if (!session) { alert("No estas logeado") }
    else {
        console.log(`Logged in as ${session.webId}.`)
        alert("estas logeado")
        console.log(local);
        await fc.copyFile( local, remote )
    }
}


function fileUploadHandler() {
    //TODO esto lo subiria a tmp
}
function  fileSelectedHadler (event){
    if(event.target.files[0] !== null )//Just to avoid a crash if you dont select anything
        if( event.target.files[0].type === 'image/jpeg') {
            this.setState({
                selectedFile: event.target.files[0]
            })
        }
        else
            alert('La imagen no está en formato jpeg')
    console.log(event.target.files[0]);
}

export const UploadComponent = () => {
    const webid = useWebId();

    return (
        //<NavBar webId={webID}/>
        <div className="upload">
            <input type="file" onChange={fileSelectedHadler}/>
            <button onClick={fileUploadHandler}>UploadToPc</button>
            <button onClick={fileUploadToReactHandler}>UploadToReact</button>

        </div>
    );
};