import {stringBuilder} from "../../../utils";

class RouteToRDF {
    constructor(route) {
        this.route = route;
        this.str = "";
    }

    parse() {
        this.str +=('<xmp highlight="turtle">');

        this.str +=('prefix viade: <http://arquisoft.github.io/viadeSpec/>');
        this.str +=('prefix schema: <http://schema.org/>');
        this.str +=('prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>');
        this.str +=('prefix xsd: <http://www.w3.org/2001/XMLSchema#>');
        this.str +=('prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>');
        this.str +=('prefix gpx: <https://www.w3.org/ns/pim/gpx#>');
        this.str +=('import <gpx.shex>');

        this.str +=(this.route);
        this.str +=(' a viade:Route;');
        this.str +=('schema:name "');
        this.str +=(this.route.name);
        this.str +=('";');
        this.str +=('schema:description "');
        this.str +=(this.route.description);
        this.str +=('";');

        this.str +=('viade:points (');
        this.parseitems();
        this.str +=(');');

        this.str +=('</xmp>');

        return this.this.str.tothis.string();
    }

    parseitems() {
        var i = 0;
        for (i = 0; i < this.route.items.length ; i++) {

            this.str +=('[');

            if (this.route.items[i].name != null) {
                this.str +=('schema:name "');
                this.str +=(this.route.items[i].name);
                this.str +=('";');
            }

            if (this.route.items[i].description != null) {
                this.str +=('schema:description "');
                this.str +=(this.route.items[i].description);
                this.str +=('";');
            }

            if (this.route.items[i].elevation != null) {
                this.str +=('schema:elevation ');
                this.str +=(this.route.items[i].elevation);
                this.str +=(';');
            }

            this.str +=('schema:latitude ');
            this.str +=(this.route.items[i].latitude);
            this.str +=(';');
            this.str +=('schema:longitude ');
            this.str +=(this.route.items[i].longitude);

            this.str +=(']');

        }
    }
}

export default RouteToRDF;