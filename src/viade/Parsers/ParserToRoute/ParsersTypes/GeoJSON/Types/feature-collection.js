import Feature from "./feature";

class FeatureCollection{
    
    execute=(geoJSON)=> {
        const features=geoJSON.features;
        if(features.length>1){throw new Error("FeatureCollection of route GeoJSON not supported")};
        this.parser=new Feature();
        return this.parser.execute(features[0]);
    }

}

export default FeatureCollection;