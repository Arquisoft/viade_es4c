import { ItemViade, RouteViade } from "../../../Model";
import gpxParser from "gpxparser/src/GPXParser";

class GpxToRoute {

    execute = (content) => {
        return this.parse(content);
    }

    parse = (content) => {

        // Creamos una instancia de gpxparser
        var gpxParse = new gpxParser();

        // Ejecutamos el parser de gpxparser.
        gpxParse.parse(content);

        // Llamamos al método "getItems" para obtener un array de los items del fichero.
        const items = this.getItems(gpxParse);

        // Creamos una nueva ruta de nombre "Unknown" y la lista de items obtenida anteriormente.
        const route = new RouteViade("Unknown", items);

        // Devolvemos la ruta que hemos creado.
        return route;

    }

    getItems = (gpxParse) => {

        // Obtenemos el número de puntos que tiene la ruta.
        const numWaypoints = gpxParse.waypoints.length;

        // Creamos un array de ese tamaño.
        var items = [numWaypoints];

        // Para cada punto de la ruta, extraemos su info, creamos un item con esta y lo añadimos al array.
        var i = 0;
        for (i = 0; i < numWaypoints; i++) {
            const longitude = gpxParse.waypoints[i].lon;
            const latitude = gpxParse.waypoints[i].lat;
            const elevation = gpxParse.waypoints[i].ele;
            items[i] = new ItemViade(longitude, latitude, i+1, elevation);
        }

        // Devolvemos el array de items.
        return items;

    }

}

export default GpxToRoute;