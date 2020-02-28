import React from "react";
//import React, {Component} from "react";
//import solid from "@solid";
import data from "@solid/query-ldflex";
import { useWebId } from "@inrupt/solid-react-components";
import {NavBar} from "../../components";
import { Value, List } from '@solid/react';

/*class FriendsComponent extends Component {

  state = {
    //listFriends: data['https://uo264451.solid.community/profile/card#me'].friends
    listFriends: ["Juanito", "Menganito", "Fulanito"]
  };

  renderTableData() {
    return this.state.listFriends.map(friend => {
      return(
      <li>{friend}</li>
      );
    });
  }

  render() {
    return(
    <ul>{this.renderTableData()}</ul>
    );
  }
}*/


/*class FriendsComponent extends Component {
	
	render() {

    const webID = useWebId();
    const listFriends = ["Margarita", "Juanito", "Menganito", "Fulanita"];

		return(
			<React.Fragment>
        <div>
          <NavBar webId={webID}/>
          <h1>Friends</h1>
        </div>
				<ul className="list-group">
					{listFriends.map(friend => (
						<li className="list-group-item list-group-item-primary">
							{friend}
						</li>
					))}
				</ul>
			</React.Fragment>
		);
	}
	
}*/


/*class FriendsComponent extends Component {
  
	state = {
    //listFriends: data['https://uo264451.solid.community/profile/card#me'].friends.firstName
    listFriends: ["Margarita", "Juanito", "Menganito", "Fulanita"]
	};
	
	render() {

    //const listFriends = ["Margarita", "Juanito", "Menganito", "Fulanita"];

		return(
			<React.Fragment>
        <div>
          <NavBar {...this.webID}/>
          <h1>Friends</h1>
        </div>
				<ul className="list-group">
					{this.state.listFriends.map(friend => (
						<li className="list-group-item list-group-item-primary">
							{friend}
						</li>
					))}
				</ul>
			</React.Fragment>
		);
	}
	
}*/

import SubFriends from './SubFriends';

/*class FriendsComponent extends React.Component {



  render() {
    return (
      <SubFriends expression={this.state.expression || defaultExpression}
                    onExpressionChange={this.onExpressionChange}/>
    );
  }

}

export default FriendsComponent;
*/
import { withWebId } from '@solid/react';

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
    // If the user just logged in, show an example with their WebID
    const { webId } = this.props;
    if (webId && webId !== prevProps.webId && !this.savedState.expression)
      this.setState({ expression: `[${webId}].name` });
  }

  onExpressionChange = expression => {
    this.savedState = { expression };
  }

  render() {
    return (
      <SubFriends expression={this.state.expression /*|| defaultExpression*/}
                    onExpressionChange={this.onExpressionChange}/>
    );
  }

}

export default withWebId(FriendsComponent);

/*const FriendsComponent = () => {
  const webID = useWebId();
  const expression = "[webID].friends.firstName";
  const listFriends = ["Margarita", "Juanito", "Menganito", "Fulanita"];
  /*const getFriends = async (webID) => {
    if (webID) {
      for await (const name of data[webID].friends) {
        console.log("  - ${name} is a friend");
      }
    }
  };
  const result = getFriends(webID);
  console.log(result);*/

  // hrefString="https://" + user + ".solid.community/profile/card#me"
  // <a href="https://uo264451.solid.community/profile/card#me">friend.firstName</a>

/*  return (
    <div>
      <NavBar webId={webID}/>
      <h1>Friends</h1>
      <div>
          <h3>Friends</h3>
          <List src={expression}>{(item, i) =>
            <li key={i}>{linkTo(`${item}`)}</li>}
          </List>
        </div>
    </div>
  );

  /*return (
    <div>
      <NavBar webId={webID}/>
      <h1>Friends</h1>
      <ul className="list-group">
					{listFriends.map(friend => (
						<li className="list-group-item list-group-item-primary">
							{friend}
						</li>
					))}
				</ul>
    </div>
  );*/
/*};

function linkTo(dest) {
  return !/^https?:/.test(dest) ? dest :
    <a href={dest} target="_blank" rel="noopener noreferrer">{dest}</a>;
}
*/
//export default FriendsComponent;

/*const FriendsComponent = () => {
  const webID = useWebId();
  const getFriends = async (webID) => {
    if (webID) {
      for await (const name of data[webID].friends) {
        /* eslint no-console: ["error", { allow: ["log"] }] */
/*        console.log("  - ${name} is a friend");
      }
    }
  };
  const result = getFriends(webID);
  console.log(result);
  return (
    <div>
      <NavBar webId={webID}/>
      <h1>Friends</h1>
      <p>See console</p>
    </div>
  );
};
*/

//export default FriendsComponent;
