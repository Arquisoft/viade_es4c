import React from "react";
import { useHistory } from "react-router-dom";
import { higherOrderComponent } from "../util";

export default higherOrderComponent("WithHistory", (Component) =>
  (props) => <Component {...props} history={useHistory()} />);
