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

  const logOut=()=>{
    auth.logout();
    window.location="/";
  };

  return (
      <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/"><Image src="/img/logo.svg" alt="Viade" /></Navbar.Brand>
          <UploadButton/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav  className="mr-auto"/>
              <Nav>
                  <NavLink exact to="/notifications">
                      <Image className="logout-img" src="/img/bell.svg" alt="Notifications" />
                  </NavLink>
                  <NavLink exact to="/myRoutes" className="link">MyRoutes</NavLink>
                  <NavLink exact to="/friendsRoutes" className="link">FriendsRoutes</NavLink>
                  <NavLink exact to="/friends" className="link">Friends</NavLink>
                  <NavLink exact to="/profile" className="link">Profile</NavLink>
                  <NavLink exact to="/share" className="link">Share</NavLink>
                  <Image className="logout-img" src="/img/logout.svg" onClick={logOut}/>
              </Nav>
          </Navbar.Collapse>
      </Navbar>
  );
};

export default AuthNavBar;
