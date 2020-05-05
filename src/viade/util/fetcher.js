import {sparqlFiddle} from "../../utils";

class Fetcher {
  fetch = async (sparql, endPoint, output = "Array") => {
    let fiddle = {
      data: endPoint,
      query: sparql,
      wanted: output,
    };

    return sparqlFiddle.run(fiddle).then(
      (results) => {
        return results;
      },
      (err) => {
        throw err;
      }
    );
  };
}

const fetcher=new Fetcher();
export {fetcher};