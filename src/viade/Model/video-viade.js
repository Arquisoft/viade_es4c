class VideoViade{

    constructor(iri, author, publicationTime,video=null){
        this.iri=iri;
        this.author=author;
        this.publicationTime=publicationTime;
        this.video=video;
    }

    getUrl(){
        if(!this.video)return;
        return URL.createObjectURL(this.video);
    }
}

export default VideoViade;