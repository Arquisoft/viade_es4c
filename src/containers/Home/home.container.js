import React from "react";
import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Spacer } from "../../components";
import { home } from "../../contexts";
import { storageHelper } from "../../viade";
import "./home.container.css";

import auth from "solid-auth-client";
import {errorToaster } from "../../utils";

/**
 * Home component that returns the homepage
 */
export const HomeComponent = () => {
  const checkStructure = async () => {
    let session = await auth.currentSession();
    if (session) {
      let webId = session.webId;
      if (!localStorage.getItem("isLogged")) {
        try {
        localStorage.setItem("isLogged", true);
          await storageHelper.checkFolderStructure(webId);
        } catch (error) {
          errorToaster("An error has occurred with your POD ");
        }
      }
    }
  };
  checkStructure();
  return (
    <Container>
      {/* Logo row */}
      <Row key={"r1"}>
        <Col key={"r1c1"} xs={12} md={2} />
        <Col key={"r1c2"} xs={12} md={8} className="logo-div home-div">
          <Image src={process.env.PUBLIC_URL + home.logo} alt={home.name} />
        </Col>
        <Col key={"r1c3"} xs={12} md={8} />
      </Row>
      {/* Description row */}
      <Row key={"r2"}>
        <Col key={"r2c1"} xs={12} md={2} />
        <Col key={"r2c2"} xs={12} md={8} className="home-div">
          <p>
            {home.description} <a href={home.link}>{home.team}</a>.
          </p>
        </Col>
        <Col key={"r2c3"} xs={12} md={2} />
      </Row>
      {/* What you can do row */}
      <Row key={"r3"}>
        <Col xs={12} md={2} />
        {home.images.map((image) => (
          <Col xs={6} md={2} className="home-div" key={image.key}>
            <Image
              src={process.env.PUBLIC_URL + image.icon}
              alt={image.alt}
              className="fill-image"
            />
            <p>{image.text}</p>
          </Col>
        ))}
        <Col xs={12} md={2} />
      </Row>
      {/* Empty rows */}
      {["r4", "r5"].map((key) => (
        <Row key={key}>
          <Col>
            <Spacer />
          </Col>
        </Row>
      ))}
      {/* Solid/UniOvi/Inrupt row */}
      <Row key={"r6"}>
        <Col key={"r6c1"} xs={12} md={3} />
        {home.footer.map((image) => (
          <Col xs={4} md={2} className="home-div logo-div" key={image.key}>
            <Image
              src={process.env.PUBLIC_URL + image.icon}
              alt={image.alt}
              className="fill-image"
            />
            <p>{image.text}</p>
          </Col>
        ))}
        <Col key={"r6c2"} xs={12} md={3} />
      </Row>
    </Container>
  );
};

export default HomeComponent;
