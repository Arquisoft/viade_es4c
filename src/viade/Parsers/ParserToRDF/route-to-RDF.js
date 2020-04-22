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
        /* Estas dos líneas se sustituirán por la tercera en caso de que se quiera poner el
        nombre de la ruta en cuestión en lugar de myRoute.
        this.str += (':');
        this.str += (this.route.name.replace(/ /g, ""));
        */
        this.str +=(':myRoute');
        this.str +=(' a viade:Route ;\n');

        // Añadimos el nombre al "schema".
        this.str +=('\tschema:name "');
        this.str +=(this.route.name);
        

        // Añadimos la descripción en caso de que el objeto Route que se nos pasa la tenga.
        if (this.route.description != null && this.route.name !== "") {
            this.str +=('" ;\n');
            this.str +=('\tschema:description "');
            this.str +=(this.route.description);
        }

        /*
        En caso de que no haya ni puntos ni contenidos multimedia en la ruta, entonces finalizamos
        la declaración de la ruta con un punto.
        En caso contrario, le agregamos un punto y coma para continuar con el resto de definiciones
        de la ruta.
        */
        if (!this.route.items.length > 0 && !this.route.media.length > 0) {
            this.str +=('" .\n');
        } else {
            this.str +=('" ;\n');
        }

        this.str +=('\n');

        // Añadimos los items parseados.
        this.parseitems();

        // Añadimos los archivos multimedia parseados.
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
            
            // Agregamos un nuevo hasMediaAttached, es decir, un nuevo enlace a un contenido multimedia.
            this.str +=('\tviade:hasMediaAttached ');
            this.str += (':media');
            this.str += (i+1);

            /*
            En caso de ser el último contenido multimedia, se añade el punto que representa el fin del
            fichero.
            En caso contrario, se añade punto y coma para seguir añadiendo contenidos multimedia.
            */
            if (i === this.route.media.length - 1) {
                this.str +=(' .\n');
            } else {
                this.str +=(' ;\n');
            }

            /*
            Usando una variable auxiliar, vamos almacenando las definiciones como tal de los contenidos
            multimedia, que posteriormente se añadirán al final del fichero, una vez la ruta esté completamente
            definida.
            */

            /*
            Añadimos el nombre del contenido multimedia, que en este caso será "media" + la posición que ocupa
            en la lista de contenidos multimedia. Ej.: media1, media2...
            */
            aux +=('\n:media');
            aux += (i+1);
            aux +=('\n');

            // Agregamos la IRI del archivo.
            aux +=('\tschema:contentUrl <');
            aux +=(this.route.media[i].iri);
            aux +=('> ;\n');

            // Añadimos la fecha de publicación del archivo.
            aux +=('\tschema:publishedDate ');
            aux +=(this.getDate(this.route.media[i].publicationTime));
            aux +=('^^xsd:dateTime');
            aux +=(' ;\n');

            // Añadimos el autor del archivo.
            aux +=('\tschema:author <');
            aux +=(this.route.media[i].author);
            aux +=('> .\n');

        }

        this.str +=('\n');

        /*
        Añadimos a la variable global str (la que tiene todo el contenido del parser) el contenido
        de la variable auxiliar utilizada para crear la representación de los archivos multimedia
        en el fichero.
        */
        this.str +=(aux);

    }

    getDate(date) {

        /*
        Creamos una variable auxiliar en la que se irá almacenando la cadena de texto que representa
        la fecha y la devolvemos.
        */

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

}

export default RouteToRDF;