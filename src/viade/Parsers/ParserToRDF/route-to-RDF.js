import {stringBuilder} from "../../../utils";

class RouteToRDF {
    constructor(route) {
        this.route = route;
        this.str = new this.stringBuilder();
    }

    parse() {
        this.str.append('<xmp highlight="turtle">');

        this.str.append('prefix viade: <http://arquisoft.github.io/viadeSpec/>');
        this.str.append('prefix schema: <http://schema.org/>');
        this.str.append('prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>');
        this.str.append('prefix xsd: <http://www.w3.org/2001/XMLSchema#>');
        this.str.append('prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>');
        this.str.append('prefix gpx: <https://www.w3.org/ns/pim/gpx#>');
        this.str.append('import <gpx.shex>');

        this.str.append(this.route);
        this.str.append(' a viade:Route;');
        this.str.append('schema:name "');
        this.str.append(this.route.name);
        this.str.append('";');
        this.str.append('schema:description "');
        this.str.append(this.route.description);
        this.str.append('";');

        this.str.append('viade:points (');
        this.parseItems(); 
        this.str.append(');');

        this.str.append('</xmp>');

        return this.this.str.tothis.string();
    }

    parseItems() {
        var i = 0;
        for (i = 0; i < this.route.items.length ; i++) {

            this.str.append('[');

            if (this.route.item[i].name != null) {
                this.str.append('schema:name "');
                this.str.append(this.route.item[i].name);
                this.str.append('";');
            }

            if (this.route.item[i].description != null) {
                this.str.append('schema:description "');
                this.str.append(this.route.item[i].description);
                this.str.append('";');
            }

            if (this.route.item[i].elevation != null) {
                this.str.append('schema:elevation ');
                this.str.append(this.route.item[i].elevation);
                this.str.append(';');
            }

            this.str.append('schema:latitude ');
            this.str.append(this.route.item[i].latitude);
            this.str.append(';');
            this.str.append('schema:longitude ');
            this.str.append(this.route.item[i].longitude);

            this.str.append(']');

        }
    }
}

export default RouteToRDF;