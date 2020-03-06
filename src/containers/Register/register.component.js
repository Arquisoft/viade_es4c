import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import  ProviderItem  from "./ProviderItem";

type Provider = {};

type Register = {
  provider: String
};

type Props = {
  providers: Array<Provider>
};

type State = {
  register: Register,
  canContinue: false
};

class RegisterComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      canContinue: false,
      register: {
        provider: ""
      }
    };
  }

  next = () => {
    const {
      canContinue,
      register: { provider }
    } = this.state;
    const { protocol, host } = window.location;
    if (canContinue) {
      //window.location = `${provider}?returnToUrl=${protocol}//${host}/register/success`;
      window.location = `${provider}?returnToUrl=${protocol}//${host}/login`;
    }
  };

  selectProvider = e => {
    const { register } = this.state;
    this.setState({
      register: { ...register, provider: e.target.value },
      canContinue: true
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      canContinue,
      register: { provider }
    } = this.state;
    const { protocol, host } = window.location;
    if (canContinue) {
      //window.location = `${provider}?returnToUrl=${protocol}//${host}/register/success`;
      window.location = `${provider}?returnToUrl=${protocol}//${host}/login`;
    }
  };

  render() {
    const {
      canContinue,
      register: { provider }
    } = this.state;
    const { providers} = this.props;

    return (
      <div>
        <h1 >Register</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <h2>Select Provider</h2>
            <div className="progress-bar" />
            <Fragment>
              <a
                href="https://solid.inrupt.com/how-it-works"
                target="_blank"
                rel="noopener noreferrer"
              >
                What is a provider?
              </a>
              <Link to="/login" className="a-with-spacing">
                Login
              </Link>
              <ul>
                {providers.map(providerData => (
                  <ProviderItem
                    data={providerData}
                    key={providerData.id}
                    onSelect={this.selectProvider}
                    radioName="providerRadio"
                    id={`radio-${providerData.id}`}
                    checked={providerData.registerLink === provider}
                  />
                ))}
              </ul>
            </Fragment>
          </div>
          <button
            className="btn-solid"
            onClick={this.next}
            type="submit"
            disabled={!canContinue}
          >
            Next
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterComponent;

