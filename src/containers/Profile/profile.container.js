import React from "react";
import {List, LoggedIn, LoggedOut, Value, withWebId} from '@solid/react';

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
            <div>
                <h1>Profile viewer</h1>
                <p>
                    <LoggedOut>You are not logged in.</LoggedOut>
                    <LoggedIn>You are logged in as <Value src="user.name"/>.</LoggedIn>

                </p>
                <p>
                    <label htmlFor="profile">Profile:</label>
                    <label><Value>{profileInput}</Value></label>
                    <input id="profile" value={profileInput}
                           onChange={(e) => this.setState({ profileInput: e.target.value })}/>
                </p>
                 {activeProfile &&
                <dl>
                    <dt>Full name</dt>
                    <dd><Value src={`[${activeProfile}].name`}/></dd>
                    <dt>Friends</dt>
                    <dd>
                        <List src={`[${activeProfile}].friends`}>{(friend) =>
                            <li key={friend}>
                                <Value src={`[${friend}].name`}>{`${friend}`}</Value>
                            </li>}
                        </List>
                    </dd>
                </dl>}
            </div>
        );
    }
}
export default withWebId(ProfileComponent);