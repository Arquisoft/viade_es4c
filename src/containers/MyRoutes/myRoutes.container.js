//COmponentes generales
//Componentes React
import React from "react";
import {Link} from "react-router-dom";
//Librerias
import auth from "solid-auth-client";
import FC from "solid-file-client";
import {RDFToRoute} from "../../viade";


class MyRoutesComponent extends React.Component {
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
        let sessionString = session.split("profile")[0] + "public/viade/routes";

        let routesName = await this.obtainRoutesName(fc, sessionString);
        this.obtainRoutes(sessionString, routesName)
    }

    async obtainRoutesName(fc, sessionString){
        // Obtengo los nombres de los archivos
        if(!await fc.itemExists(sessionString)) return [];
        let folder = await fc.readFolder(sessionString);
        let array = folder.files;
        console.log(array);
        return array
    }

    async obtainRoutes(sessionString, routesName){
        // Con los nombres de los archivos, los obtengo y los parseo de RDF a Route
        let aux = [];
        for (let r of routesName){
            let promise = RDFToRoute.parse(sessionString + "/" + r.name);
            let route=await  promise.then((result)=>result);
            console.log(route);
            aux.push(route)
        }
        this.setState({routes: aux})
    }

    render() {
        return (
            <div>
                <div className="container center-block vlsection1">
                    <h1 className="text-center">Rutas</h1>
                    {this.getRoutes()}
                </div>
            </div>
        );
    }    
    }  

export default MyRoutesComponent;
