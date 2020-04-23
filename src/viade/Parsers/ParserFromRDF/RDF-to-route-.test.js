import { RouteViade, ItemViade } from "../../Model";
import { RDFToRoute } from ".";
describe.only('Parser from RDF to route', () => {
  
    const values=[[-5.09765625,39.90973623453719],[3.427734375,46.195042108660154],[14.414062499999998,51.28940590271679],[26.54296875,46.49839225859763]];
    let items=[]
    for(let i=0;i<values.length;i++){
        let item=new ItemViade(values[i][0],values[i][1]);
        item.order=i;
        items.push(item);
    }
    const output=new RouteViade("Prueba",items);
  
    const url="https://testses4c.solid.community/public/1587499225222.ttl#Prueba";

    test('route RDF 1', () => {
        RDFToRoute.parse(url).then((r=>expect(r).toEqual(output)));
    });

  });