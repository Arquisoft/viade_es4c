import React from "react";
import {withWebId} from '@solid/react';
import SubFriends from './SubFriends';

class FriendsComponent extends React.Component {
  state = this.savedState;

  // Save the state in the URL fragment
  get savedState() {
    return { expression: decodeURIComponent(window.location.hash.substr(1)) };
  }
  set savedState({ expression }) {
    window.location.replace(`#${encodeURIComponent(expression)}`);
  }

  componentDidUpdate(prevProps) {
    const { webId } = this.props;
    if (webId && webId !== prevProps.webId && !this.savedState.expression)
      this.setState({ expression: `[${webId}].friends` });
  }

  onExpressionChange = expression => {
    this.savedState = { expression };
  }

  render() {
    return (
      <SubFriends expression={this.state.expression} onExpressionChange={this.onExpressionChange}/>
    );
  }

}

export default withWebId(FriendsComponent);

