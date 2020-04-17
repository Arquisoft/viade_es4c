import React from "react";

class ImageViade{

    constructor(iri,author,publicationTime,image=null){
        this.iri=iri;
        this.author=author;
        this.publicationTime=publicationTime;
        this.image=image;
    }

    getUrl(){
        if(!this.image) {
            return;
        }

        return URL.createObjectURL(this.image);
    }

    getComponent() {
        return <img className="d-block route-img" src={this.getUrl()} alt={this.author} />;
    }

}

export default ImageViade;