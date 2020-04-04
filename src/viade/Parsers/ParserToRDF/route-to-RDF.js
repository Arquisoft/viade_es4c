class RouteToRDF {

    constructor(route) {

        this.route = route;
        this.str = "";
        
    }

    parse() {

        // Establecemos los "prefix" que vamos a utilizar.
        this.str +=('@prefix : <#>.');
        this.str +=('@prefix viade: <http://arquisoft.github.io/viadeSpec/>.');
        this.str +=('@prefix schema: <http://schema.org/>.');
        this.str +=('@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.');
        this.str +=('@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.');

        // Definimos la ruta como un objeto de tipo Route de viade haciendo uso de su nombre.
        this.str += (':');
        this.str += (this.route.name.replace(/ /g, ""));
        this.str +=(' a viade:Route;');

        // Añadimos el nombre al "schema".
        this.str +=('schema:name "');
        this.str +=(this.route.name);
        this.str +=('";');

        // Añadimos la descripción en caso de que el objeto Route que se nos pasa la tenga.
        if (this.route.description != null && this.route.name !== "") {
            this.str +=('schema:description "');
            this.str +=(this.route.description);
            this.str +=('";');
        }

        // Añadimos los items parseados.
        this.parseitems();

        // Añadimos los archivos multimedia parseados
        this.parseMedia();

        /*
        Devolvemos la cadena de texto que hemos creado, que tendrá el formato definido en viadeSpec,
        concretamente basado en Turtle.
        */
        return this.str;

    }

    parseitems() {

        // Para cada item de la ruta que estamos parseando se hace lo siguiente:
        for (let i = 0; i < this.route.items.length ; i++) {

            // Declaramos un "point" de viade, dentro del cual tendremos los atributos de este punto.
            this.str +=('viade:point [');

            // Agregamos la latitud y la longitud.
            this.str +=('schema:latitude ');
            this.str +=(this.route.items[i].latitude);
            this.str +=(';');
            this.str +=('schema:longitude ');
            this.str +=(this.route.items[i].longitude);
            this.str +=(';');

            // Agregamos el orden que ocupa este punto entre el conjunto de puntos de la ruta.
            this.str +=('viade:order ');
            this.str +=(this.route.items[i].order);

            // Agregamos opcionalmente la altitud del punto en cuestión.
            if (this.route.items[i].elevation != null) {
                this.str +=(';');
                this.str +=('schema:elevation ');
                this.str +=(this.route.items[i].elevation);
            }

            /*
            Si este es el último punto de la ruta, se pone un punto al cerrar el "array" que contiene los puntos,
            para asegurarnos así de que se finaliza correctamente el rango que contiene las declaraciones de los
            puntos.
            Si no es el último, se pone un punto y coma para seguir con los demás.
            */
            if (i === this.route.items.length - 1) {
                this.str +=('].');
            } else {
                this.str +=('];');
            }
        }

    }

    parseMedia() {

        var aux;

        // Para cada archivo multimedia de la ruta que estamos parseando se hace lo siguiente:
        for (let i = 0; i < this.route.media.length; i++) {

            if (i == this.route.media.length - 1) {
                
            }
            
            aux +=(':media');
            aux +=(i + 1);
            aux +=(' schema:contentUrl <');
            aux +=(this.route.media[i].iri);
            aux +=('>;');
            aux +=('schema:publishedDate "');
            aux +=(this.route.media[i].publicationTime);
            aux +=('";');
            aux +=('schema:author <');
            aux +=(this.route.media[i].author);
            aux +=('>.');

        }

    }

}

export default RouteToRDF;