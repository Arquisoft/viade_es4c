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

        // Obtenemos el número de Tracks que tiene la ruta.
        const numTracks = gpxParse.tracks.length;

        // Creamos un array sin tamaño fijo para una mayor flexibilidad, ya que no sabemos cuántos puntos tenemos en total.
        var items = new Array();

        // Para cada track de la ruta, extraemos sus puntos, creamos items con ellos y los añadimos al array.
        var i = 0;
        var j = 0;
        var numTotalPoints = 0;

        for (i = 0; i < numTracks; i++) {

            // Obtenemos el número de puntos que tiene el track.
            var numPoints = gpxParse.tracks[i].points.length;

            // Para cada punto de la ruta, extraemos su info, creamos un item con esta y lo añadimos al array.
            for (j = 0; j < numPoints; j++) {

                const longitude = gpxParse.tracks[i].points[j].lon;
                const latitude = gpxParse.tracks[i].points[j].lat;
                const elevation = gpxParse.tracks[i].points[j].ele;
                items[numTotalPoints] = new ItemViade(longitude, latitude, numTotalPoints+1, elevation);

                numTotalPoints++;

            }

        }

        // Devolvemos el array de items.
        return items;

    }

}

export default GpxToRoute;