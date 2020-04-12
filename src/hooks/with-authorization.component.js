import React from "react";
import { withWebId } from "@solid/react";
import {withHistory} from "./components";

export const withAuthorization = (Component, Loader) =>
  withHistory(withWebId(
    class WithAuthorization extends React.Component {
      render() {
        const { webId ,history} = this.props;
        switch (webId) {
          case undefined:
            return Loader || null;
          case null:
            history.push("/");
            return null;
          default:
            return <Component {...this.props} />;
        }
      }
    }
  ));
