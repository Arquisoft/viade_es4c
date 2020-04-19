import React, {Component, Fragment} from "react";
import ProviderItem from "./ProviderItem";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "./register.component.css";
import {CustomButton} from "../../index";

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

	selectProvider = (e) => {
		const { register } = this.state;
		this.setState({
			register: { ...register, provider: e.target.value },
			canContinue: true
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const {
			canContinue,
			register: { provider }
		} = this.state;
		const { protocol, host } = window.location;
		if (canContinue) {
			//window.location = `${provider}?returnToUrl=${protocol}//${host}/register/success`;
			window.location = `${provider}?returnToUrl=${protocol}//${host}/`;
		}
	};

	render() {
		const {
			canContinue,
			register: { provider }
		} = this.state;
		const { providers} = this.props;

		return (
			<Card className="text-center" style={{ width: "25rem" }}>
				<Card.Img variant="top" src={process.env.PUBLIC_URL + "/img/logo.svg"} />
				<Card.Body>
					<Card.Title>Make a SOLID account</Card.Title>
					<Card.Body>
						<Form onSubmit={this.onSubmit}>
							<div>
								<h1>Select Provider</h1>
								<div className="progress-bar" />
								<Fragment>
									<a
										href="https://solid.inrupt.com/how-it-works"
										target="_blank"
										rel="noopener noreferrer"
									>What is a provider?</a>
									<ul>
										{providers.map((providerData) => (
											<div className="p-item" key={`div-${providerData.id}`}>
												<ProviderItem
													data={providerData}
													key={providerData.id}
													onSelect={this.selectProvider}
													radioName="providerRadio"
													className="registerRadio"
													id={`radio-${providerData.id}`}
													checked={providerData.registerLink === provider}
												/>
											</div>
										))}
									</ul>
								</Fragment>
							</div>
							<CustomButton
								className="btn-solid"
								onClick={this.next}
								type="submit"
								disabled={!canContinue}
								text="Next"
							/>
						</Form>
					</Card.Body>
				</Card.Body>
			</Card>
		);
	}
}

export default RegisterComponent;