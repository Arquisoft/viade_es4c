import React from "react";
import auth from "solid-auth-cli";
import FC from "solid-file-client";
import {NavBar} from "../../components";
import { useWebId } from "@inrupt/solid-react-components";

export const RoutesListComponent = () => {
    const webId = useWebId();
    
    // I will use: https://github.com/jeff-zucker/solid-file-client
    const fc   = new FC( auth ) //With fc we can manage files
    async function run(){

        var publicFolder = await fc.readFolder("https://mrmenchaca.solid.community/public") //Get an item which has the url with the files(routes)

        for(var i=0; i < publicFolder.files.length; i++){ //Iterate over the files 
            // var file =  await fc.readHead(publicFolder.files[i].url) //Get the file's content
            console.log(publicFolder.files[i].name) //Get the file's name
        }
    }
    run()

    return (
        <div>
            <p>.</p>
            <p>.</p>
            <h1>Listado de rutas</h1>
        </div>
    );
};