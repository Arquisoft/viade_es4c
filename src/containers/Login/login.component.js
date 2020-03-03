import React from "react";
import { Link } from "react-router-dom";
import { ProviderLogin } from "@inrupt/solid-react-components";
import { Provider } from "../../services";

const LoginComponent = () => {
  return (

    <div className="">
        <h1 data-testid="title">Login de Viade es4c</h1>
        <Link to="/register">Sign Up</Link>
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
    </div>
  );
};

export default LoginComponent;
