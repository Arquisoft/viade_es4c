import React from "react";
import {Image} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Spacer} from "../../components";
import {home} from "../../contexts";
import "./home.container.css";

/**
 * Home component that returns the homepage
 */
export const HomeComponent = () => {
    return (
        <Container>
            {/* Logo row */}
            <Row>
                <Col xs={12} md={2} />
                <Col xs={12} md={8} className="logo-div home-div">
                    <Image src={process.env.PUBLIC_URL + home.logo} alt={home.name}/>
                </Col>
                <Col xs={12} md={8} />
            </Row>
            {/* Description row */}
            <Row>
                <Col xs={12} md={2} />
                <Col xs={12} md={8} className="home-div">
                    <p>{home.description} <a href={home.link}>{home.team}</a>.</p>
                </Col>
                <Col xs={12} md={2} />
            </Row>
            {/* What you can do row */}
            <Row>
                <Col xs={12} md={2} />
                {home.images.map((image) => (
                    <Col xs={6} md={2} className="home-div" key={image.key}>
                        <Image src={process.env.PUBLIC_URL + image.icon}
                               alt={image.alt} className="fill-image"/>
                        <p>{image.text}</p>
                    </Col>
                ))}
                <Col xs={12} md={2} />
            </Row>
            {/* Empty rows */}
            {[0,0].map(() => (
                <Row>
                    <Col><Spacer/></Col>
                </Row>
            ))}
            {/* Solid/UniOvi/Inrupt row */}
            <Row>
                <Col xs={12} md={3} />
                {home.footer.map((image) => (
                    <Col xs={4} md={2} className="home-div logo-div" key={image.key}>
                        <Image src={process.env.PUBLIC_URL + image.icon}
                               alt={image.alt} className="fill-image"/>
                        <p>{image.text}</p>
                    </Col>
                ))}
                <Col xs={12} md={3} />
            </Row>
        </Container>
    );
};

export default HomeComponent;
