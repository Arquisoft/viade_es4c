import React from "react";
import "./share-container.css";

import { useWebId } from "@inrupt/solid-react-components";

const ShareComponent = () => {
    const webID = useWebId();
    return (
        <div>
          <p>.</p>
          <p>.</p>
          <h1>Share Routes</h1>
          <h3>Route's name:</h3>
          <input type="text" id="myText" value="Route..."/>
          <p></p>
          <h3>Insert your friend's webID: </h3>
          <input type="text" id="myText" value="webID..."/>
        </div>
    );
  };
  
  export default ShareComponent;