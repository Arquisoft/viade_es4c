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

}

export default ImageViade;