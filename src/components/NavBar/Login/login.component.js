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
    <div>
      <Card className="text-center" style={{ width: "25rem" }}>
          {/* Viade logo */}
          <Card.Img variant="top" src={process.env.PUBLIC_URL + "/img/logo.svg"} />
          <Card.Body>
              <Card.Title>Login of Viade es4c</Card.Title>
              <Card.Text>
                  {/* Library component holding the login */}
                  <ProviderLogin
                      selectPlaceholder="Pick an identity provider"
                      inputPlaholder="Please enter your WebID or the URL of your identity provider"
                      formButtonText="Login"
                      btnTxtWebId="Login with WebId"
                      btnTxtProvider="Login with Provider"
                      className="provider-login-component"
                      callbackUri={`${window.location.protocol}//${window.location.host}/viade_es4c/#/`}
                      errorsText={{
                          unknown: "An unknown error has occurred",
                          webIdNotValid: "The WebId is not valid",
                          emptyProvider: "Empty Provider",
                          emptyWebId: "The WebId is empty"
                      }}
                      providers={Provider.getIdentityProviders()}
                  />
              </Card.Text>
          </Card.Body>
      </Card>
    </div>

  );
};

export default LoginComponent;
