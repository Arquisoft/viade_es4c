import React from "react";
import data from "@solid/query-ldflex";
import { useWebId } from "@inrupt/solid-react-components";
import {NavBar} from "../../components";

const FriendsComponent = () => {
  const webID = useWebId();
  const getFriends = async (webID) => {
    if (webID) {
      const person = data[webID];
      for await (const name of person.friends) {
        console.log("  - ${name} is a friend");
      }
    }
  };
  getFriends(webID);
  return (
    <div>
      <NavBar webId={webID}/>
      <h1>Friends</h1>
      <p>See console</p>
    </div>
  );
};

export default FriendsComponent;
