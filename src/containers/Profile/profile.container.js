import React from "react";
import { Image, List, LoggedIn, Value, withWebId } from "@solid/react";
import { FriendCard, ProfileCard } from "../../components";
import { routeHelper } from "../../viade";
import Container from "react-bootstrap/Container";
import "./profile.container.css";
import { errorToaster } from "../../utils";

class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedNMyRoutes: false,
      loadedNFriendsRoutes: false,
    };
    this.nMyRoutes = this.getNumMyRoutes();
    this.nFriendsRoutes = this.getNumSharedWithMe();
  }

  getNumMyRoutes = async () => {
    try {
      return await routeHelper.fetchUrlMyRoutes().then((res) => {
        this.nMyRoutes = res.length;
        this.setState({ loadedNMyRoutes: true });
      });
    } catch (error) {
      errorToaster(error.message);
    }
  };

  getNumSharedWithMe = async () => {
    try {
      return await routeHelper.fetchUrlSharedWithMeRoutes().then((res) => {
        this.nFriendsRoutes = res ? res.length : 0;
        this.setState({ loadedNFriendsRoutes: true });
      });
    } catch (error) {
      errorToaster(error.message);
    }
  };

  render() {
    return (
      <Container>
        <LoggedIn>
          <ProfileCard
            webId={this.props.webId}
            image={
              <Image
                src="user.image"
                defaultSrc={process.env.PUBLIC_URL + "/img/cards/profile.png"}
                className="profile route-card-image"
                alt={"Profile image"}
              />
            }
            name={<Value src="user.name" />}
            user={<Value src="user" />}
            nMyRoutes={this.state.loadedNMyRoutes ? this.nMyRoutes : null}
            nFriendsRoutes={
              this.state.loadedNFriendsRoutes ? this.nFriendsRoutes : null
            }
          />
          <h2 style={{ textAlign: "center" }}>Friends</h2>
          <List src="user.friends">
            {(friend) => <FriendCard key={`${friend}`} friend={`${friend}`} />}
          </List>
        </LoggedIn>
      </Container>
    );
  }
}
export default withWebId(ProfileComponent);
