import React from "react";
import { Image, List, LoggedIn, Value, withWebId } from "@solid/react";
import { Button, FormControl, InputGroup, Container} from "react-bootstrap";
import { FriendCard, ProfileCard } from "../../components";
import { routeHelper } from "../../viade";
import { errorToaster } from "../../utils";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import addFriend from "./services/";
import "./profile.container.css";

class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedNMyRoutes: false,
      loadedNFriendsRoutes: false,
      enteredWebId: "",
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

  updateFriendWebId = (evt) => { this.setState( {enteredWebId: evt.target.value}) };

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
          <div className={"list-holder"}>
            <InputGroup className="mb-3">
              <FormControl
                  onChange={this.updateFriendWebId}
                  placeholder="Username WebId"
                  aria-label="Username WebId"
                  aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="outline-primary"
                        onClick={() => addFriend(this.state.enteredWebId, this.props.webId, this.updateLastFriend)}>
                  <FontAwesomeIcon icon={faPlus} data-toggle="tooltip" title="My POD"/>
                   Add Friend
                </Button>
              </InputGroup.Append>
            </InputGroup>
            {<List src="user.friends">
              {(friend) => <FriendCard key={`${friend}`} friend={`${friend}`} enable={true}/>}
            </List>}
          </div>
        </LoggedIn>
      </Container>
    );
  }
}
export default withWebId(ProfileComponent);
