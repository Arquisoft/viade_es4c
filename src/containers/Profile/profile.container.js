import React from "react";
import {Image, List, LoggedIn, Value, withWebId} from "@solid/react";
import {ProfileCard} from "../../components";
import {routeHelper} from "../../viade";
import Container from "react-bootstrap/Container";
import "./profile.container.css";

class ProfileComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadedNMyRoutes: false,
            loadedNFriendsRoutes: false
        };
        this.nMyRoutes = this.getNumMyRoutes();
        this.nFriendsRoutes = this.getNumSharedWithMe();
    }

    getNumMyRoutes = async () => {
        return await routeHelper.fetchUrlMyRoutes().then((res) => {
            this.nMyRoutes = res.length;
            this.setState({loadedNMyRoutes: true});
        });
    };

    getNumSharedWithMe = async () => {
        return await routeHelper.fetchUrlSharedWithMeRoutes().then((res) => {
            this.nFriendsRoutes = res.length;
            this.setState({loadedNFriendsRoutes: true});
        });
    };

    render() {
        return (
            <Container>
                <LoggedIn>
                    <ProfileCard
                        image={<Image src="user.image" defaultSrc={process.env.PUBLIC_URL + "/img/cards/profile.png"}
                                      className="profile route-card-image"  alt={"Profile image"}/>}
                        name={<Value src="user.name"/>}
                        user={<Value src="user"/>}
                        nMyRoutes={this.state.loadedNMyRoutes? this.nMyRoutes : null}
                        nFriendsRoutes={this.state.loadedNFriendsRoutes? this.nFriendsRoutes : null}
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