import React from "react";
import {List, Value, withWebId} from "@solid/react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Image} from "react-bootstrap";
import {Spacer} from "../../components";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "./profile.container.css";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

class ProfileComponent extends React.Component {
    state = { profileInput: "", activeProfile: "" };

    componentDidUpdate(prevProps) {
        const webId = this.props.webId;
        if (webId && webId !== prevProps.webId) {
            this.setState({profileInput: webId});
            this.setState({activeProfile: webId});
        }
    }

    viewProfile(profile) {
        this.setState({ profileInput: profile, activeProfile: profile });
    }

    render() {
        const profileInput = this.state.profileInput;
        const activeProfile  = this.state.activeProfile;
        return (
            <Container>
                {/* Spacer row */}
                <Row>
                    <Col xs={12} md={12}>
                        <Spacer/>
                    </Col>
                </Row>
                {/* Description row */}
                <Row>
                    <Col xs={12}/>
                    <Col xs={12} md={8} className="profile-card">
                        <Card className="text-center">
                            <Card.Header>
                                <Image src="/viade_es4c/img/profile/user.png" className="profile-img"/>
                                <Value src={`[${activeProfile}].name`}/>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    <Image src="/viade_es4c/img/Solid.svg" className="profile-img"/>
                                    <a href={profileInput}>
                                        {profileInput}
                                    </a>
                                </Card.Title>
                                <Accordion defaultActiveKey="0">
                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                Friends
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <List src={`[${activeProfile}].friends`}>{(friend) =>
                                                <li key={friend}>
                                                    <Value src={`[${friend}].name`}>{`${friend}`}</Value>
                                                </li>}
                                            </List>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                                <Card.Text>
                                    <Link to="/myRoutes">
                                        <Image src="/viade_es4c/img/home/keepyours.svg" className="profile-img"/>
                                        <h2>My routes</h2>
                                    </Link>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12}/>
                </Row>
            </Container>
        );
    }
}
export default withWebId(ProfileComponent);