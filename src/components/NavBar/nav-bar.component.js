import React from "react";
import { NavLink } from "react-router-dom";
import {Image, Navbar} from "react-bootstrap";
import "./navbar.css";
import Nav from "react-bootstrap/Nav";

/**
 * Navigation bar which contains de actions of a user not loggedin
 * @param props
 *  @webId ID of the user
 * @returns {*}
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
                  <NavLink
                      to="/register"
                      className="link"
                  >
                      Sign Up
                  </NavLink>
                  <NavLink to="/login" className="link">
                      Log In
                  </NavLink>
              </Nav>
          </Navbar.Collapse>
      </Navbar>
  );
};

export default NavBar;
