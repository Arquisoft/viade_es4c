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

	/**
	 * Logs out the current authenticated user
	 * @returns {Promise<void>}		Async promise
	 */
	const logOut = async () => {
		await auth.logout();
		localStorage.removeItem("solid-auth-client");
		localStorage.removeItem("isLogged");
		window.location = process.env.PUBLIC_URL;
	};

	return (
		<Navbar bg="light" expand="lg">
			{/* Application logo, leading to the home */}
			<Navbar.Brand href={process.env.PUBLIC_URL + navbar.logo.href}>
				<Image src={process.env.PUBLIC_URL + navbar.logo.src} alt={navbar.logo.alt}/>
			</Navbar.Brand>
			{/* Button that opens the upload pop-up */}
			<CustomModal text="Upload a route" img="/img/buttons/upload.png"
				component={<UploadComponent/>}/>
			{/* Hamburger menu for mobile and lesser screens */}
			<Navbar.Toggle aria-controls="basic-navbar-nav"/>
			<Navbar.Collapse id="basic-navbar-nav">
				{/* Nav spacer */}
				<Nav className="mr-auto"/>
				<Nav>
					{/* Notifications button */}
					<NavLink exact to={navbar.notifications.href}>
						<CustomButton
							img={navbar.notifications.src}/>
					</NavLink>
					{/* Rest of links of the navbar, loaded from the JSON config file */}
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
					{/* Log out button */}
					<CustomButton img={navbar.logout.src} onClick={logOut} testid={"logoutbtn"}/>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default AuthNavBar;
