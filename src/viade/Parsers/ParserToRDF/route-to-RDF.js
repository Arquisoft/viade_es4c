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

        this.str += (':');
        this.str += (this.route.name);
        this.str +=(' a viade:Route;');
        this.str +=('schema:name "');
        this.str +=(this.route.name);
        this.str +=('";');

        if (this.route.description != null && this.route.name !== "") {
            this.str +=('schema:description "');
            this.str +=(this.route.description);
            this.str +=('";');
        }

        this.parseitems();

        return this.str;
    }

    parseitems() {
        for (let i = 0; i < this.route.items.length ; i++) {
            this.str +=('viade:point [');
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
            this.str +=(';');

            this.str +=('viade:order ');
            this.str +=(this.route.items[i].order);

            if (i === this.route.items.length - 1) {
                this.str +=('].');
            } else {
                this.str +=('];');
            }


        }
    }
}

export default RouteToRDF;