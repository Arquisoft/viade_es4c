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
      return this.state.routes.map(obj => (
          <div className="text-center">
              <Link key={obj.name} to={{
                      pathname: "/showRoute",
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

      let routes = await this.obtainRoutesName(fc, sessionString);
      this.obtainRoutes(routes)
  }

  async obtainRoutesName(fc, sessionString){
      // Obtengo los nombres de los archivos
      let filesArray = [];
      let filesString = "";
      try{
        filesString = await fc.readFile(sessionString + "/shared_with_me.txt");
      }catch{
        console.log("No tienes ficheros compartidos de amigos, pringao :(");
      }
      filesArray = filesString.split("\n");
      return filesArray;
  }

  async obtainRoutes(routes){
      // Con los nombres de los archivos, los obtengo y los parseo de RDF a Route
      let aux = [];
      for (let r of routes){
          let promise = RDFToRoute.parse(r);
          let route=await  promise.then((result)=>result);
          aux.push(route)
      }
      this.setState({routes: aux})
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