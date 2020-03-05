import React from "react";
import auth from "solid-auth-cli";
import FC from "solid-file-client";
import { useWebId } from "@inrupt/solid-react-components";
import {NavBar} from "../../components";

const ViewMapComponent = () => {
  const webID = useWebId(); // https://xxxxx.solid.community/profile/card#me

  return (
      <div>
        <p>.</p>
        <p>.</p>
        <h1>This is the map!!!</h1>
      </div>
  );
};

export default ViewMapComponent;
