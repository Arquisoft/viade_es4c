class RouteToRDF {
    constructor(route) {
        this.route = route;
        this.str = "";
    }

    parse() {

        this.str +=('@prefix : <#>.');
        this.str +=('@prefix viade: <http://arquisoft.github.io/viadeSpec/>.');
        this.str +=('@prefix schema: <http://schema.org/>.');
        this.str +=('@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.');
        this.str +=('@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.');

        this.str +=(':myRoute a viade:Route;');
        this.str +=('schema:name "');
        this.str +=(this.route.name);
        this.str +=('";');

        if (this.route.description != null && this.route.name != "") {
            this.str +=('schema:description "');
            this.str +=(this.route.description);
            this.str +=('";');
        }

        this.parseitems();

        return this.str.toString();
    }

    parseitems() {
        var i = 0;
        for (i = 0; i < this.route.items.length ; i++) {

            this.str +=('viade:point [');

            if (this.route.items[i].name != null && this.route.items[i].elevation != "") {
                this.str +=('schema:name "');
                this.str +=(this.route.items[i].name);
                this.str +=('";');
            }

            if (this.route.items[i].description != null && this.route.items[i].elevation != "") {
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

            if (i == this.route.items.length - 1) {
                this.str +=('].');
            } else {
                this.str +=('];');
            }
            

        }
    }
}

export default RouteToRDF;