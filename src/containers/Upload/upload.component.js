import React,{Component} from  'react';
import {Link, NavLink} from 'react-router-dom';
import { useWebId } from "@inrupt/solid-react-components";
import {NavBar} from "../../components";

import SolidFileClient from 'solid-file-client'
import auth from 'solid-auth-client'



// const auth = require('/node_modules/solid-auth-client')
//const FileClient = require('/node_modules/solid-file-client')
//const fc = new FileClient(auth)
const fc = new SolidFileClient(auth , { enableLogging: true })

//const local  = "file://" + process.cwd() + "/square.png"
//const local  = "file://C:\\Users\\arvo\\WebstormProjects\\viade_es4c\\public\\tmp\\"
const remote = "https://Tovarashi.solid.community/public/example.jpg"
const local  = "file://C:/Users/arvo/WebstormProjects/viade_es4c/public/tmp/example.jpg"



async function fileUploadToReactHandler(webid) {
    if(webid)
        alert(webid)
    else
        alert("No estas logeado crack")
    try {
        alert("Intendo de logearse")
        await auth.login()
        //await fc.copyFile( local, remote )
    }
    catch(err) {
        console.log(err)
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
    var webId = useWebId();


    return (
        //<NavBar webId={webID}/>


        <div className="upload">
            <input type="file" onChange={fileSelectedHadler}/>
            <button onClick={fileUploadHandler}>UploadToPc</button>
            <button onClick={fileUploadToReactHandler}>UploadToReact</button>

        </div>
    );
};