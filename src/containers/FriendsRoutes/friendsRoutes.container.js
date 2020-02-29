import React from "react";
import { useWebId } from "@inrupt/solid-react-components";
import {NavBar} from "../../components";

const FriendsRoutesComponent = () => {
  const webID = useWebId();
  return (
      <div>
        <p>.</p>
        <p>.</p>
        <h1>My friends routes</h1>
      </div>
  );
};

export default FriendsRoutesComponent;
