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

/**
 * Page containing all the profile implementation (needs some refactoring to make it modular)
 */
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

  /**
   * Loads the number of routes the user has in this app
   * @returns {Promise<[]|undefined>} Promise that when finished loads the number of routes in the app
   */
  getNumMyRoutes = async () => {
    try {
      return await routeHelper.fetchAllUrlMyRoutes().then((res) => {
        this.nMyRoutes = res.length;
        this.setState({ loadedNMyRoutes: true });   // Sets the number of own routes
      });
    } catch (error) {
      errorToaster(error.message);
    }
  };

  /**
   * Loads the number of routes your friend shared with you in this app
   * @returns {Promise<undefined>} Promise that when finished loads the number of friend routes
   */
  getNumSharedWithMe = async () => {
    try {
      return await routeHelper.fetchAllUrlSharedWithMeRoutes().then((res) => {
        this.nFriendsRoutes = res ? res.length : 0;
        this.setState({ loadedNFriendsRoutes: true });  // Sets the number of friend routes
      });
    } catch (error) {
      errorToaster(error.message);
    }
  };

  /**
   * Updates the entered web id in the new friend input
   * @param evt Event triggering the update
   */
  updateFriendWebId = (evt) => { this.setState( {enteredWebId: evt.target.value}); };

  render() {
    return (
      <Container>
        <LoggedIn>
          {/* Profile card of the user */}
          <ProfileCard
            webId={this.props.webId}
            image={
              /* Image doesn't load a lot of the times */
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
            {/* Input group where to add the friend */}
            <InputGroup className="mb-3">
              {/* input */}
              <FormControl
                  onChange={this.updateFriendWebId}
                  placeholder="Username WebId"
                  aria-label="Username WebId"
                  aria-describedby="basic-addon2"
              />
              {/* solid community indicator and submit button */}
              <InputGroup.Append>
                <Button variant="outline-primary"
                        onClick={() => addFriend(this.state.enteredWebId, this.props.webId, this.updateLastFriend)}>
                  <FontAwesomeIcon icon={faPlus} data-toggle="tooltip" title="My POD"/>
                   Add Friend
                </Button>
              </InputGroup.Append>
            </InputGroup>
            {/* List of friends */}
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
