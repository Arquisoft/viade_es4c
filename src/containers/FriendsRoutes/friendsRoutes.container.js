//COmponentes generales
//Componentes React
import React from "react";
import {Link} from "react-router-dom";
//Librerias
import auth from "solid-auth-client";
import FC from "solid-file-client";
import {RDFToRoute} from "../../viade";

class FriendsRoutesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
          routes: []
      };
  }

  getRoutes() {
      return this.state.routes.map((obj) => (
          <div className="text-center">
              <Link key={obj.name} to={{
                      pathname: "/viade_es4c/showRoute",
                      state: {
                          route: obj
                      }
              }}>
                  <h3>{obj.name}</h3>
              </Link>
          </div>));
  }

  async componentDidMount(){
      const fc = new FC(auth); //With fc we can manage files

      // Obtengo el link de la sesion
      let session = (await auth.currentSession()).webId;
      let sessionString = session.split("profile")[0] + "public/viade";

      let json = await this.obtainRoutesName(fc, sessionString);
      this.obtainRoutes(json);
  }

  async obtainRoutesName(fc, sessionString){
      // Obtengo los nombres de los archivos
      let filesString = "";
      try{
        filesString = await fc.readFile(sessionString + "/shared_with_me.txt");
        return JSON.parse(filesString);
      }catch{
        return null;
      }
      
  }

  async obtainRoutes(json){
      // Con los nombres de los archivos, los obtengo y los parseo de RDF a Route
      if(!json){return;}
      let aux = [];
      for (let r of json.rutas){
          let promise = RDFToRoute.parse(r);
          let route=await  promise.then((result) => result);
          aux.push(route);
      }
      this.setState({routes: aux});
  }

  render() {
      return (
          <div>
              <div className="container center-block vlsection1">
                  <h1 className="text-center">Friends Routes</h1>
                  {this.getRoutes()}
              </div>
          </div>
      );
  }    
  } 

export default FriendsRoutesComponent;