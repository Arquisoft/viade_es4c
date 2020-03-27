import React from "react";
import {Image} from "react-bootstrap";

import "./home.container.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Spacer} from "../../components";

/**
 * Home component that returns the homepage
 */
export const HomeComponent = () => {
    return (
        <Container>
            {/* Logo row */}
            <Row>
                <Col xs={12}></Col>
                <Col xs={12} md={8} className="logo-div home-div">
                    <Image src="/viade_es4c/img/logo.svg" alt="Viade"/>
                </Col>
                <Col xs={12}></Col>
            </Row>
            {/* Description row */}
            <Row>
                <Col xs={12}></Col>
                <Col xs={12} md={8} className="home-div">
                    <p>Viade is a Solid project developed by third year students of the University of Oviedo
                        Software Engineering degree in the Software Architecture subject. It offers a route sharing
                        application following the SOLID principles. This is a site where all your data always remains
                        yours. <a href="https://github.com/Arquisoft/viade_es4c">Developed by team es4c</a>.</p>
                </Col>
                <Col xs={12}></Col>
            </Row>
            {/* What you can do row */}
            <Row>
                <Col xs={12}></Col>
                <Col xs={6} md={2} className="home-div">
                    <Image src="/viade_es4c/img/home/uploadroute.svg" alt="Upload a route" className="fill-image"/>
                    <p>Upload a new route</p>
                </Col>
                <Col xs={6} md={2} className="home-div">
                    <Image src="/viade_es4c/img/home/uploadmedia.svg" alt="Upload images and videos" className="fill-image"/>
                    <p>Complete it with images and videos</p>
                </Col>
                <Col xs={6} md={2} className="home-div">
                    <Image src="/viade_es4c/img/home/shareroute.svg" alt="Share it" className="fill-image"/>
                    <p>Share it with whoever you want</p>
                </Col>
                <Col xs={6} md={2} className="home-div">
                    <Image src="/viade_es4c/img/home/keepyours.svg" alt="Keep the ownership of your data" className="fill-image"/>
                    <p>And keep the ownership of all this</p>
                </Col>
                <Col xs={12}></Col>
            </Row>
            {/* Empty rows */}
            <Row>
                <Col><Spacer/></Col>
            </Row>
            <Row>
                <Col><Spacer/></Col>
            </Row>
            {/* Solid/UniOvi/Inrupt row */}
            <Row>
                <Col xs={12}></Col>
                <Col xs={4} md={2} className="home-div logo-div">
                    <Image src="/viade_es4c/img/Solid.svg" alt="Solid" className="fill-image"/>
                </Col>
                <Col xs={4} md={3} className="logo-div home-div">
                    <Image src="/viade_es4c/img/home/uniovi.jpg" alt="Universidad de Oviedo"/>
                </Col>
                <Col xs={4} md={2} className="home-div logo-div">
                    <Image src="/viade_es4c/img/inrupt.svg" alt="Inrupt" className="fill-image"/>
                </Col>
                <Col xs={12}></Col>
            </Row>
        </Container>
    );
};

export default HomeComponent;
