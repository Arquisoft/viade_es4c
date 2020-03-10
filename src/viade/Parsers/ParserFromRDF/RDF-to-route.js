import * as jsonld from 'jsonld';
import {RouteViade,ItemViade} from '../../Model';

class RDFToRoute{
    /**
     * @param {*} content Content of RDF file in N-Quads format
     */
    constructor(content){
        this.content=content;
    }

    parse(){
        const objJSON=await jsonld.fromRDF(this.content, {format: 'application/n-quads'});
        const route=this.parseRDFRoute(objJSON);
        return route;
    }

    parseRDFRoute(objJSON){
        const routeName=objJSON.name;
        const routeDescription=objJSON.description;
        const items=this.parseRDFItems(objJSON.itinerary);
        let route=new RouteViade(routeName,items,routeDescription);
        return route;
    }

    parseRDFItems(itinerary){
        const size=itinerary.numberOfItems;
        let array=[];
        for (let i = 0; i < size; i++) {
            let item=this.parseRDFItem(itinerary.itemListElement[i]);       
            array.push(item);
        }
        return array;
    }

    parseRDFItem(item){
        const nameItem=item.name;
        const descriptionItem=item.description;
        const addresItem=item.address;
        const elevationItem=item.elevation;
        const latitudeItem=item.latitude;
        const longitudeItem=item.longitude;
        const postalCodeItem=item.postalCode;
        return new ItemViade(longitudeItem,latitudeItem,nameItem,descriptionItem,addresItem,elevationItem,postalCodeItem);
    }
}

export default RDFToRoute;