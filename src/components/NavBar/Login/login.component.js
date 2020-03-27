import React from "react";
import {ProviderLogin} from "@inrupt/solid-react-components";
import {Provider} from "../../../services";
import Card from "react-bootstrap/Card";
import "./login.css";

/**
 * Login Component which handles all the login logic
 * @returns {*}
 * @constructor
 */
const LoginComponent = () => {
  return (
    <nav className="nav nav__login">
      <Card className="text-center" style={{ width: "25rem" }}>
          <Card.Img variant="top" src="/viade_es4c/img/logo.svg" />
          <Card.Body>
              <Card.Title>Login of Viade es4c</Card.Title>
              <Card.Text>
                  <ProviderLogin
                      selectPlaceholder="Pick an identity provider"
                      inputPlaholder="Please enter your WebID or the URL of your identity provider"
                      formButtonText="Login"
                      btnTxtWebId="Login with WebId"
                      btnTxtProvider="Login with Provider"
                      className="provider-login-component"
                      callbackUri={`${window.location.origin}`}
                      errorsText={{
                          unknown: "unknown error",
                          webIdNotValid: "webIdNotValid",
                          emptyProvider: "emptyProvider",
                          emptyWebId: "emptyWebId"
                      }}
                      providers={Provider.getIdentityProviders()}
                  />
              </Card.Text>
          </Card.Body>
      </Card>
    </nav>

  );
};

export default LoginComponent;
