import React from "react";
import { useWebId } from "@inrupt/solid-react-components";
import {Spacer} from "../../components";

const MyRoutesComponent = () => {
  const webID = useWebId();
  return (
      <div>
          <Spacer/>
          <h1>My routes</h1>
      </div>
  );
};

export default MyRoutesComponent;
