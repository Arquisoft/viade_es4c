import {sparqlFiddle} from "../../utils";

class Fetcher {
  fetch = async (sparql, endPoint, wanted = "Array") => {
    let fiddle = {
      data: endPoint,
      query: sparql,
      wanted: wanted,
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
export default fetcher;