//import { ItemViade, RouteViade } from "../../../Model";
//import { gpxParse } from "gpx-parse";

class GpxToRoute {
/*
    execute = (content) => {
        return this.parse(content);
    };

    parse = content => {
        var gpxParse = require("gpx-parse");
        const route = gpxParse.parseGpx(content,  function(error, result) {

            // En caso de que no se produzca un error (es decir, si el error es null) utilizamos el objeto result para obtener los datos que necesitamos
            if (error == null) {
                
                // Obtenemos el número de puntos que tiene la ruta
                const numWaypoints = result.waypoints.length;

                // Creamos un array de ese tamaño
                var items = [numWaypoints];

                // Para cada punto de la ruta, extraemos su info, creamos un item con esta y lo añadimos al array
                var i = 0;
                for (i = 0; i < numWaypoints; i++) {
                    const longitude = result.waypoints[i].lon;
                    const latitude = result.waypoints[i].lat;
                    const elevation = result.ele;
                    items[i] = new ItemViade(longitude, latitude, i+1, elevation);
                }

                // Creamos una nueva ruta de nombre "Unknown" y la lista de items obtenida anteriormente
                const route = new RouteViade("Unknown", items);
                
                // Devolvemos la ruta que hemos creado
                console.log(route);
                return route;

            } else {
                console.log("Error: el archivo no ha podido ser leído correctamente.");
                console.log(error);
                return null;
                // TODO: Lanzar ventana de error emergente
            }
        });

        console.log(route);
        return route;
    };
*/
}

export default GpxToRoute;