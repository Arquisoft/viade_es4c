import React from "react";
import {Image, Navbar} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import auth from "solid-auth-client";
import {NavLink} from "react-router-dom";
import {CustomButton, CustomModal} from "../";
import {navbar} from "../../contexts";
import UploadComponent from "./UploadButton";

/**
 * Navigation bar which contains de actions of a user logged in
 */
const AuthNavBar = () => {

	const logOut = async () => {
		await auth.logout();
		localStorage.removeItem("solid-auth-client");
		window.location = "/";
	};

	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand href={process.env.PUBLIC_URL + navbar.logo.href}>
				<Image src={process.env.PUBLIC_URL + navbar.logo.src} alt={navbar.logo.alt}/>
			</Navbar.Brand>
			<CustomModal text="Upload a route" img="/img/buttons/upload.png"
				component={<UploadComponent/>}/>
			<Navbar.Toggle aria-controls="basic-navbar-nav"/>
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto"/>
				<Nav>
					<NavLink exact to={navbar.notifications.href}>
						<CustomButton img={navbar.notifications.src}/>
					</NavLink>
                    {navbar.links.map((link) =>
                        <NavLink exact to={link.href} className="link" key={link.href}>
                            <div>
                                <Image
                                    src={process.env.PUBLIC_URL + link.src}
                                    alt={link.alt}
                                    style={{height: "25px"}}/>
                            </div>
                            {link.text}
                        </NavLink>)}
					<CustomButton img={navbar.logout.src} onClick={logOut}/>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default AuthNavBar;
