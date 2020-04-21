import React from "react";
import {Image, Navbar} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import LoginComponent from "./Login";
import RegisterContainer from "./Register";
import {navbar} from "../../contexts";
import {CustomModal} from "../index";

/**
 * Navigation bar which contains de actions of a user not logged in
 *  @returns {*}
 */
const NavBar = () => {

	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand href={process.env.PUBLIC_URL + navbar.logo.href}>
				<Image src={process.env.PUBLIC_URL + navbar.logo.src} alt={navbar.logo.alt}/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav"/>
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
				</Nav>
				<Nav>
					{/* Button that opens the login modal */}
					<CustomModal img="/img/buttons/login.png" text="Login"
								component={<LoginComponent/>}/>
					{/* Button that opens the register modal */}
					<CustomModal img="/img/buttons/register.png" text="Register"
								component={<RegisterContainer/>}/>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
