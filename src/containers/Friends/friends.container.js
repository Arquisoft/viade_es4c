import React from "react";
import data from "@solid/query-ldflex";
import { useWebId } from "@inrupt/solid-react-components";
import {NavBar} from "../../components";

const FriendsComponent = () => {
  const webID = useWebId();
  const getFriends = async (webID) => {
    if (webID) {
      for await (const name of data[webID].friends) {
        // eslint no-console: ["error", { allow: ["log"] }] 
        console.log("  - ${name} is a friend");
      }
    }
  };
  const result = getFriends(webID);
  console.log(result);
  return (
    <div>
      <h1>Friends</h1>
      <p>See console</p>
    </div>
  );
};

export default FriendsComponent;
