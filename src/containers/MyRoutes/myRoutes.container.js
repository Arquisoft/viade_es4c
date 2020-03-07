//COmponentes generales
//Componentes React
import React from "react";
import {Link} from "react-router-dom";
//Librerias
import auth from "solid-auth-client";
import FC from "solid-file-client";
import {ItemViade, RouteViade} from "../../viade/Model";


// Ruta de prueba /////////////////////////////////////////////////////////
var items = [];

const item1 = new ItemViade();
item1.longitude=42.7843378;
item1.latitude=-8.8879561;
item1.name="Item1";
item1.description="Description1";
items.push(item1);

const item2 = new ItemViade();
item2.longitude=42.7788287;
item2.latitude=-8.8891135;
item2.name="Item2";
item2.description="Description2";
items.push(item2);

const item3 = new ItemViade();
item3.longitude=42.7740152;
item3.latitude=-8.8903451;
item3.name="Item3";
item3.description="Description3";
items.push(item3);

const item4 = new ItemViade();
item4.longitude=42.7706397;
item4.latitude=-8.8899538;
item4.name="Item4";
item4.description="Description4";
items.push(item4);

const exampleRoute = new RouteViade("Noia",items);
exampleRoute.name = "Noia";
exampleRoute.description = "Example route";
///////////////////////////////////////////////////////////////////////////////////////

class MyRoutesComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
          url: "https://mrmenchaca.solid.community/public",
          routes: [] 
        };
    }

    getRoutes() {
        return this.state.routes.map(obj => (
            <div className="text-center">
                <Link key={obj.name} to={{
                        pathname: "/showRoute",
                        state: {
                            route: exampleRoute
                        }
                }}>
                    <h3>{obj.name}</h3>
                </Link>
            </div>));
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
