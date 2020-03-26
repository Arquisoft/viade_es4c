class NotificationToRDF{

    parse=(notification)=>{
        console.log(notification.title);
        return `@prefix terms: <http://purl.org/dc/terms#>.
        @prefix as: <https://www.w3.org/ns/activitystreams#>.
        @prefix schema: <http://schema.org/>.
        @prefix solid: <https://www.w3.org/ns/solid/terms#>.
        @prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
        @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
        
        <> a as:Offer;
            schema:license <`+this.clearQuotes(notification.license)+`>;
            terms:title "`+notification.title+`";
            as:summary "`+notification.description+`";
            as:actor <`+this.clearQuotes(notification.actor)+`>;
            as:target <`+this.clearQuotes(notification.target)+`>;
            as:object <`+this.clearQuotes(notification.object)+`>;
            solid:read "`+notification.read+`"^^xsd:boolean;
            as:published "`+notification.published+`"^^xsd:dateTime.`;
    }

    clearQuotes=(string)=>{
        if(!string)return;
        return string.replace(/['"]+/g, '');
    }
}

const parser=new NotificationToRDF();
export default parser;