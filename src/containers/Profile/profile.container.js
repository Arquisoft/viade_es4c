import React from "react";
import {List, Value, withWebId, Image, LoggedIn} from "@solid/react";
import {ProfileCard} from "../../components";
import {routeHelper} from "../../viade";
import Container from "react-bootstrap/Container";
import "./profile.container.css";

class ProfileComponent extends React.Component {

    getNumMyRoutes=async ()=>{
        let myRoutes=await routeHelper.fetchUrlMyRoutes();
        return myRoutes.length();
    }

    getNumSharedWithMe=async()=>{
        let sharedWithMe=await routeHelper.fetchUrlSharedWithMeRoutes();
        return sharedWithMe.length();   
    }

    render() {
        return (
            <Container>
                <LoggedIn>
                    <ProfileCard
                        image={<Image src="user.image" defaultSrc={process.env.PUBLIC_URL + "/img/cards/profile.png"}
                                      className="profile route-card-image"  alt={"Profile image"}/>}
                        name={<Value src="user.name"/>}
                        user={<Value src="user"/>}
                        getNumMyRoutes={this.getNumMyRoutes}
                        getNumSharedWithMe={this.getNumSharedWithMe}
                        />

                    <h2>Friends</h2>
                    <List src="user.friends">
                        {(friend) =>
                            <li key={friend}>
                                <Value src={`[${friend}].name`}>{`${friend}`}</Value>
                            </li>}
                    </List>
                </LoggedIn>
            </Container>
        );
    }
}
export default withWebId(ProfileComponent);