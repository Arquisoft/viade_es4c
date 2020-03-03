import React from "react";
import auth from "solid-auth-cli";
import FC from "solid-file-client";
import { useWebId } from "@inrupt/solid-react-components";
import {NavBar} from "../../components";

const MyRoutesComponent = () => {
  const webID = useWebId(); // https://xxxxx.solid.community/profile/card#me
    
  // I will use: https://github.com/jeff-zucker/solid-file-client
  if (webID != null){
    
    const fc   = new FC( auth ) //With fc we can manage files
    async function run(){

      //Get an item which has the url with the files(routes)
      let publicFolder = await fc.readFolder(webID.split("profile")[0] + "public") 

      for(var i=0; i < publicFolder.files.length; i++){ //Iterate over the files 
          // let file =  await fc.readHead(publicFolder.files[i].url) //Get the file's content
          console.log(publicFolder.files[i].name) //Get the file's name
      }
    }
    run()
  }

  return (
      <div>
        <p>.</p>
        <p>.</p>
        <h1>My routes</h1>
      </div>
  );
};

export default MyRoutesComponent;
