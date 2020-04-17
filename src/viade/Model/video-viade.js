import React from "react";

class VideoViade {

	constructor(iri, author, publicationTime, video = null) {
		this.iri = iri;
		this.author = author;
		this.publicationTime = publicationTime;
		this.video = video;
	}

	getUrl() {
		if (!this.video) {
			return;
		}
		return URL.createObjectURL(this.video);
	}

	getComponent() {
		return <video controls className="d-block route-img" src={this.getUrl()}/>;
	}
}

export default VideoViade;