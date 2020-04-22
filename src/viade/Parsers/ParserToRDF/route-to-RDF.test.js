import { RouteViade, ItemViade } from "../../Model";
import { RouteToRDF } from ".";
import {rdf} from "../../../../tests/rdf";
describe.only('Parser from RDF to route', () => {
  
    const values=[[-5.09765625,39.90973623453719],[3.427734375,46.195042108660154],[14.414062499999998,51.28940590271679],[26.54296875,46.49839225859763]];
    let items=[]
    for(let i=0;i<values.length;i++){
        let item=new ItemViade(values[i][0],values[i][1]);
        item.order=i;
        items.push(item);
    }
    const input=new RouteViade("Prueba",items);
  
    const output=`@prefix : <#> .\n@prefix viade: <http://arquisoft.github.io/viadeSpec/> .\n@prefix schema: <http://schema.org/> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n\n:myRoute a viade:Route ;\n\tschema:name "Prueba" ;\n\tschema:description "" ;\n\n\tviade:point [\n\t\tschema:latitude 39.90973623453719 ;\n\t\tschema:longitude -5.09765625 ;\n\t\tviade:order 0\n\t];\n\tviade:point [\n\t\tschema:latitude 46.195042108660154 ;\n\t\tschema:longitude 3.427734375 ;\n\t\tviade:order 1\n\t];\n\tviade:point [\n\t\tschema:latitude 51.28940590271679 ;\n\t\tschema:longitude 14.414062499999998 ;\n\t\tviade:order 2\n\t];\n\tviade:point [\n\t\tschema:latitude 46.49839225859763 ;\n\t\tschema:longitude 26.54296875 ;\n\t\tviade:order 3\n\t].\n\n`;
    test('route to RDF', () => {
        let parser=new RouteToRDF(input);
        expect(parser.parse()).toEqual(output);
    });
  });

