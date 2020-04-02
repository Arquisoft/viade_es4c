import {SmallRDFToRoute,ParserToRoute,RDFToRoute} from "../Parsers";


export const fetchBasicRoute=(url)=>{
    return SmallRDFToRoute.parse(url);
}

export const fetchFullRoute=async(url)=>{
    return RDFToRoute.parse(url);
}

export const parseRoutefromFile=(file)=>{
    return ParserToRoute.parse(file).then(route => route);
}