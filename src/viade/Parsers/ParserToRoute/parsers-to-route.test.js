import { RouteViade, ItemViade } from "../../Model";
import { ParserToRoute } from ".";
import {input1,input2,input3} from "../../../../tests/geojson";

describe.only('Parser to route', () => {
  
    const values=[[-5.09765625,39.90973623453719],[3.427734375,46.195042108660154],[14.414062499999998,51.28940590271679],[26.54296875,46.49839225859763]];
    let items=[]
    for(let i=0;i<values.length;i++){
        let item=new ItemViade(values[i][0],values[i][1]);
        item.order=i;
        items.push(item);
    }
    const output=new RouteViade("Unknown",items);
  
    const geo1=new File([JSON.stringify(input1)],"geojson1.json",{type: "application/json"});
    const geo2=new File([JSON.stringify(input2)],"geojson2.json",{type: "application/json"});
    const geo3=new File([JSON.stringify(input3)],"geojson3.json",{type: "application/json"});

    test('route GeoJSON 1', () => {
      ParserToRoute.parse(geo1).then((r=>expect(r).toEqual(output)));
    });

    test('route GeoJSON 2', () => {
        ParserToRoute.parse(geo2).then((r=>expect(r).toEqual(output)));
      });

      test('route GeoJSON 3', () => {
        ParserToRoute.parse(geo3).then((r=>expect(r).toEqual(output)));
      });

  });