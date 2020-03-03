import React from "react";
import { useWebId } from "@inrupt/solid-react-components";
import {Spacer} from "../../components";

const FriendsRoutesComponent = () => {
  const webID = useWebId();
  return (
      <div>
          <Spacer/>
        <h1>My friends routes</h1>
      </div>
  );
};

export default FriendsRoutesComponent;
