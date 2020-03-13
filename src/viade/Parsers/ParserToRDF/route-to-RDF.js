import {StringBuilder} from "../../../../utils";

class RouteToRDF {
    constructor(route) {
        this.route = route;
        str = new StringBuilder();
    }

    parse() {
        str.append('<xmp highlight="turtle">');

        str.append('prefix viade: <http://arquisoft.github.io/viadeSpec/>');
        str.append('prefix schema: <http://schema.org/>');
        str.append('prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>');
        str.append('prefix xsd: <http://www.w3.org/2001/XMLSchema#>');
        str.append('prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>');
        str.append('prefix gpx: <https://www.w3.org/ns/pim/gpx#>');
        str.append('import <gpx.shex>');

        str.append(this.route);
        str.append(' a viade:Route;');
        str.append('schema:name "');
        str.append(this.route.name);
        str.append('";');
        str.append('schema:description "');
        str.append(this.route.description);
        str.append('";');

        str.append('viade:points (');
        this.parseItems(); 
        str.append(');');

        str.append('</xmp>');

        return this.str.toString();
    }

    parseItems() {
        var i = 0;
        for (i = 0; i < this.route.items.length ; i++) {

            str.append('[');

            if (this.route.item[i].name != null) {
                str.append('schema:name "');
                str.append(this.route.item[i].name);
                str.append('";');
            }

            if (this.route.item[i].description != null) {
                str.append('schema:description "');
                str.append(this.route.item[i].description);
                str.append('";');
            }

            if (this.route.item[i].elevation != null) {
                str.append('schema:elevation ');
                str.append(this.route.item[i].elevation);
                str.append(';');
            }

            str.append('schema:latitude ');
            str.append(this.route.item[i].latitude);
            str.append(';');
            str.append('schema:longitude ');
            str.append(this.route.item[i].longitude);

            str.append(']');

        }
    }
}

export default RouteToRDF;