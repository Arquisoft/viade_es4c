import React from "react";
import {Image, Navbar} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import UploadButton from "./UploadButton";
import auth from "solid-auth-client";
import {NavLink} from "react-router-dom";

/**
* Navigation bar which contains de actions of a user logged in
*/
const AuthNavBar = () => {

  const logOut=() => {
    auth.logout();
    window.location="/viade_es4c";
  };

  return (
      <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/viade_es4c/"><Image src="/viade_es4c/img/logo.svg" alt="Viade" /></Navbar.Brand>
          <UploadButton/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav  className="mr-auto"/>
              <Nav>
                  <NavLink exact to="/viade_es4c/notifications">
                      <Image className="logout-img" src="/viade_es4c/img/bell.svg" alt="Notifications" />
                  </NavLink>
                  <NavLink exact to="/viade_es4c/myRoutes" className="link">MyRoutes</NavLink>
                  <NavLink exact to="/viade_es4c/friendsRoutes" className="link">FriendsRoutes</NavLink>
                  <NavLink exact to="/viade_es4c/profile" className="link">Profile</NavLink>
                  <NavLink exact to="/viade_es4c/share" className="link">Share</NavLink>
                  <Image className="logout-img" src="/viade_es4c/img/logout.svg" onClick={logOut}/>
              </Nav>
          </Navbar.Collapse>
      </Navbar>
  );
};

export default AuthNavBar;
