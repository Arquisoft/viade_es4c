class RouteToRDF {

    constructor(route) {

        this.route = route;
        this.str = "";
        
    }

    parse() {

        // Establecemos los "prefix" que vamos a utilizar.
        this.str +=('@prefix : <#> .\n');
        this.str +=('@prefix viade: <http://arquisoft.github.io/viadeSpec/> .\n');
        this.str +=('@prefix schema: <http://schema.org/> .\n');
        this.str +=('@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n');
        this.str +=('@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n');
        this.str +=('\n');

        // Definimos la ruta como un objeto de tipo Route de viade haciendo uso de su nombre.
        this.str += (':');
        this.str += (this.route.name.replace(/ /g, ""));
        this.str +=(' a viade:Route ;\n');

        // Añadimos el nombre al "schema".
        this.str +=('\tschema:name "');
        this.str +=(this.route.name);
        this.str +=('" ;\n');

        // Añadimos la descripción en caso de que el objeto Route que se nos pasa la tenga.
        if (this.route.description != null && this.route.name !== "") {
            this.str +=('\tschema:description "');
            this.str +=(this.route.description);
            this.str +=('" ;\n');
        }

        this.str +=('\n');

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
            this.str +=('\tviade:point [\n');

            // Agregamos la latitud y la longitud.
            this.str +=('\t\tschema:latitude ');
            this.str +=(this.route.items[i].latitude);
            this.str +=(' ;\n');
            this.str +=('\t\tschema:longitude ');
            this.str +=(this.route.items[i].longitude);
            this.str +=(' ;\n');

            // Agregamos el orden que ocupa este punto entre el conjunto de puntos de la ruta.
            this.str +=('\t\tviade:order ');
            this.str +=(this.route.items[i].order);

            // Agregamos opcionalmente la altitud del punto en cuestión.
            if (this.route.items[i].elevation != null) {
                this.str +=(' ;\n');
                this.str +=('\t\tschema:elevation ');
                this.str +=(this.route.items[i].elevation);
            }

            this.str +=('\n\t');

            /*
            Si este es el último punto de la ruta y esta no tiene contenido multimedia, entonces se pone un punto
            que representará el final de la declaración de la ruta.
            En caso contrario, se pone un punto y coma para poder incluir en dicha declaración el contenido multi-
            media justo debajo de los puntos.
            */
            if (i === this.route.items.length - 1 && !this.route.media.length > 0) {
                this.str +=('].');
            } else {
                this.str +=('];\n');
            }
        }

    }

    parseMedia() {

        var aux = "";
        this.str +=('\n');
        

        // Para cada archivo multimedia de la ruta que estamos parseando se hace lo siguiente:
        for (let i = 0; i < this.route.media.length; i++) {
            
            this.str +=('\tviade:hasMediaAttached ');
            this.str += (':media');
            this.str += (i+1);

            if (i == this.route.media.length - 1) {
                this.str +=(' .\n');
            } else {
                this.str +=(' ;\n');
            }

            aux +=('\n:media');
            aux += (i+1);
            aux +=('\n');

            aux +=('\tschema:contentUrl <');
            aux +=(this.route.media[i].iri);
            aux +=('> ;\n');

            aux +=('\tschema:publishedDate ');
            aux +=(this.getDate(this.route.media[i].publicationTime));
            aux +=('^^xsd:dateTime');
            aux +=(' ;\n');

            aux +=('\tschema:author <');
            aux +=(this.route.media[i].author);
            aux +=('> .\n');

        }

        this.str +=('\n');
        this.str +=(aux);

    }

    getDate(date) {

        var aux = "";

        aux +=('"');
        aux +=(date.getFullYear());
        aux +=('-');
        aux +=(date.getMonth());
        aux +=('-');
        aux +=(date.getDate());
        aux +=('T');
        aux +=(date.getHours());
        aux +=(':');
        aux +=(date.getMinutes());
        aux +=(':');
        aux +=(date.getSeconds());
        aux +=('"');

        return aux;

    }

    /*parseMedia() {

        var aux = "";

        this.str +=('viade:hasMediaAttached ');

        // Para cada archivo multimedia de la ruta que estamos parseando se hace lo siguiente:
        for (let i = 0; i < this.route.media.length; i++) {
            
            aux += (':media');
            aux += (i+1);

            aux +=(' schema:contentUrl ');
            aux +=(this.route.media[i].iri);
            aux +=(';');
            aux +=('schema:publishedDate ');
            aux +=(this.route.media[i].publicationTime);
            aux +=('schema:author ');
            aux +=(this.route.media[i].author);

            if (i == this.route.media.length - 1) {
                aux +=('.');
            } else {
                aux +=(';');
            }

        }

        this.str +=(aux);

    }*/

    /*parseMedia() {

        // Para cada archivo multimedia de la ruta que estamos parseando se hace lo siguiente:
        for (let i = 0; i < this.route.media.length; i++) {
            
            this.str +=('viade:hasMediaAttached [');

            this.str +=('schema:contentUrl "');
            this.str +=(this.route.media[i].iri);
            this.str +=('";');
            this.str +=('schema:publishedDate ');
            this.str +=(this.route.media[i].publicationTime);
            this.str +=(';');
            this.str +=('schema:author "');
            this.str +=(this.route.media[i].author);
            this.str +=('"');

            if (i == this.route.media.length - 1) {
                this.str +=('].');
            } else {
                this.str +=('];');
            }

        }

    }*/

}

export default RouteToRDF;