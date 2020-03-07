import React from "react";
import "./navbar.css";
import {NavLink} from "react-router-dom";
import {Image, Navbar} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import LoginModal from "./Login";

/**
 * Navigation bar which contains de actions of a user not logged in
 *  @returns {*}
 */
const NavBar = () => {

  return (
      <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/"><Image src="/img/logo.svg" alt="Viade" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav  className="mr-auto">
              </Nav>
              <Nav>
                  <LoginModal/>
                  <NavLink
                      to="/register"
                      className="link"
                  >
                      Sign Up
                  </NavLink>
              </Nav>
          </Navbar.Collapse>
      </Navbar>
  );
};

export default NavBar;
