//COmponentes generales
//Componentes React
import React from "react";
import {Link} from "react-router-dom";
//Librerias
import auth from "solid-auth-client";
import FC from "solid-file-client";


class MyRoutesComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
          url: "https://mrmenchaca.solid.community/public",
          routes: [] 
        };
    }

    getRoutes() {
        return this.state.routes.map(obj => (<div className="text-center"><Link key={obj.name} to="/showRoute"><h3>{obj.name}</h3></Link></div>));
    }

    async componentDidMount(){
        const fc = new FC(auth) //With fc we can manage files

        let session = (await auth.currentSession()).webId;
        let sessionString = session.split("profile")[0] + "public"
        console.log(sessionString)

        let folder = await fc.readFolder(sessionString)
        let array = folder.files
        this.setState({routes : array})
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
