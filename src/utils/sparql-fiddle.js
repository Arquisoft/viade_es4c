import * as rdf from "rdflib";
class SparqlFiddle{

    setRdfType = (type) => { this.rdfType = type; };

    do = (fiddle) => {
      return new Promise((resolve, reject) => {
        this.parseRdf(fiddle).then( (response) => {
            this.prepare(fiddle).then( (preparedQuery) => {              
                this.execute(fiddle,preparedQuery).then( (results) => {
                    this.store = fiddle.store;
                    if(fiddle.wanted==="Array"){
                        resolve(results)
                    }
                    else if(fiddle.wanted==="Hash") {
                        resolve( this.ary2hash(fiddle,results) );
                    }
                    else if(results.length < 1) {
                        resolve( "No results!"  );
                    }
                    else if(fiddle.wanted==="Value") {
                        let key = ( Object.keys(results[0])[0]  );
                        resolve( results[0][key] );
                    }
                    else { 
                        let formatted = this.displayHandler(fiddle,results);
                        resolve(formatted);
                    }  
                },err => reject(err))
            },err => reject(err))
        },err => reject(err))
      })
    };

    ary2hash =(fiddle,ary) => {
        let hash = {};
        let a;
        for(a in ary){
            a = ary[a];
            hash[a[fiddle.key]] = a;
        }
        return hash;
    };
    parseRdf = (fiddle) => { return new Promise((resolve, reject) => {
        if(!fiddle.data){
              return resolve();
        }
        let type = fiddle.dataType;
        if(typeof(document)!=="undefined") {type = this.rdfType;}
        if(!type)  {type = "text/turtle";}
        let endpointUrl = "http://example.org/inMemory";
        try {
            rdf.parse(
                fiddle.data, fiddle.store, rdf.sym(endpointUrl).uri, type
            );
            resolve();
        }
        catch(err) { reject(err); }
    });};
    prepare = (fiddle) => {
        return new Promise((resolve, reject)=>{
            try {            
              let query = rdf.SPARQLToQuery(fiddle.query,false,fiddle.store);
              resolve(query);
            }
            catch(err) { reject(err); }
        })
    };
    execute =  (fiddle,preparedQuery) => {
        let rowHandler = fiddle.rowHandler || this.rowHandler;
        return new Promise((resolve, reject)=>{
            let wanted = preparedQuery.vars;
            let resultAry = [];
            fiddle.store.query(preparedQuery, (results) =>  {
                if(typeof(results)==="undefined") { reject("No results."); }
                else { 
                    let row = rowHandler(fiddle,wanted,results) ;
                    if(row) {resultAry.push(row);}
                }
            }, {} , function(){resolve(resultAry);} )
        })
    };
    rowHandler =(fiddle,wanted,results) => {
        let row = {};
        let r;
        for(r in results){
            let found = false;
            let got = r.replace(/^\?/,"");
            if(wanted.length){
                let w;
                for(w in wanted){
                    if(got===wanted[w].label){ found=true; continue; }
                }
                if(!found) {continue;}
            } 
            row[got]=results[r].value;
        }
        if(fiddle.rowHandler){
            row = fiddle.rowHandler(row);
        }
        return(row);
    };
/*
  DATA DISPLAY
*/
    displayHandler = (fiddle,results) => {
        let type = (fiddle.wanted)
                 ? fiddle.wanted
                 : (typeof(document)===undefined)
                   ? "Text"
                   : "HTML";
        if(type==="Text") {return this.showText(results);}
        if(type==="HTML") {return this.showHtml(results);}
    };
    showText = (results) => {
        let columnHeads = Object.keys(results[0]).reverse();
        let str = "\n";
        let r;
        for(r in results){
            //let row = "";
            let k;
            for(k in columnHeads){
                str += `${columnHeads[k]} : ${results[r][columnHeads[k]]}\n`;
            }
            str += "\n";
        }
        return(str);
    };
    /* TBD : refactor to build a DOM object rather than a string
    */
    showHtml = (results) => {
        let columnHeads = Object.keys(results[0]).reverse();
        let table = "<table>";
        let topRow = "";
        let c;
        for(c in columnHeads){
            topRow += `<th>${columnHeads[c]}</th>`;
        }
        table += `<tr>${topRow}</tr>`;
        let r;
        for(r in results){
            let row = "";
            let k;
            for(k in columnHeads){
                row += `<td>${results[r][columnHeads[k]]}</td>`;
            }
            table += `<tr>${row}</tr>`;
        }
        table += "</table>";
        return(table);
    };
/* 
  USER FUNCTIONS
*/
/*
    PREFIX : <http://example.org/inMemory#>
    SELECT ?name ?format ?data ?query WHERE { 
        ?x :name ?name; :dataFormat ?format; :data ?data; :query ?query . 
    }
*/
    runFromLibrary = ( fiddleLibrary, fiddleName, options) => {
        return new Promise((resolve, reject) => {
            let fiddle = {
              wanted : "Array",
                data : fiddleLibrary,
                query :`
    PREFIX : <http://example.org/inMemory#>
    SELECT ?type ?data ?query WHERE { 
        ?x :name "${fiddleName}"; :dataFormat ?type; :data ?data; :query ?query . 
    }
`,
            };
            this.run( fiddle ).then( (fiddle) => {
                let newFiddle = {
                    wanted : options.wanted,
                      data : fiddle[0].data,
                     query : fiddle[0].query,
                  dataType : fiddle[0].type
                };
                this.run( newFiddle ).then( (results) => {
                    resolve(results)
                }, err => reject(err) )
            }, err => reject(err) )
        }, err => console.log(err) )
    };
    loadLibrary = ( fiddleLibrary) => {
        return new Promise((resolve, reject)=>{
            let fiddle = {
              wanted : "Hash",
                 key : "name",
                data : fiddleLibrary,
                query :`
    PREFIX : <http://example.org/inMemory#>
    SELECT ?name ?type ?data ?query WHERE { 
        ?x :name ?name :dataFormat ?type; :data ?data; :query ?query . 
    }
`,
            };
            this.run( fiddle ).then( (results) => {
                resolve(results)
            }, err => reject(err) )
        }, (err) => console.log("CH: "+err) );
    };
    run = (fiddle) => { 
      return new Promise((resolve, reject)=>{
        fiddle.store = (fiddle.data.length>0)
                     ? rdf.graph()
                     : this.store;
        if( fiddle.data.match(/^http/ ) ){
            this.loadFromUrl(fiddle,"data").then( (fiddle) => {
                this.loadSparqlAndDo( fiddle ).then( (results) => {
                    resolve(results)
                }, (err) => reject(err) )
            }, (err) => reject(err) )
        }
        else {
            this.loadSparqlAndDo( fiddle ).then( (results) => {
                resolve(results)
            }, (err) => reject(err) )
        }
      })
    };
/* 
  DATA LOADING
*/
    loadSparqlAndDo = ( fiddle ) => {
      return new Promise((resolve, reject) =>{
        if( fiddle.query.match( /^http/ ) ){
            this.loadFromUrl(fiddle,"query").then( (fiddle) => {
                this.do(fiddle).then( (results) => {
                    resolve(results)
                }, (err) => reject(err) )
            }, (err) =>  reject(err) )
        }
        else {
            this.do(fiddle).then( (results) => {
                resolve(results)
            }, (err) => reject(err) );
        }
      })
    };
    loadFromUrl = (fiddle,type) => {
      let url = fiddle[type];
      return new Promise((resolve, reject)=>{
        let fetcher = new rdf.fetcher( rdf.graph() );
        try {
            fetcher.load(url).then( (response) => {
                // replace the url with it's content
                fiddle[type] = response.responseText;
                resolve( fiddle )
            }).catch((err)=>reject(err));
        } catch(err) { reject(err) }
      })
    };
    loadFromUrlPlain = (url) => {
      return new Promise((resolve, reject) => {
        let fetcher = new rdf.fetcher( rdf.graph() );
        try {
            fetcher.load(url).then( response => {
                resolve( response.responseText );
            })
        } catch(err) { reject(err); }
      });
    }
}

const sparq=new SparqlFiddle();
export default sparq;