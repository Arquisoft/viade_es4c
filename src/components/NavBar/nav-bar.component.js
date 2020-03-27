import React from "react";
import {Image, Navbar} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import LoginModal from "./Login";
import RegisterModal from "./Register";

/**
 * Navigation bar which contains de actions of a user not logged in
 *  @returns {*}
 */
const NavBar = () => {

  return (
      <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/viade_es4c"><Image src="/viade_es4c/img/logo.svg" alt="Viade" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav  className="mr-auto">
              </Nav>
              <Nav>
                  <LoginModal/>
                  <RegisterModal/>
              </Nav>
          </Navbar.Collapse>
      </Navbar>
  );
};

export default NavBar;
