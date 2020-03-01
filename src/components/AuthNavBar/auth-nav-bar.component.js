import React from "react";
import { NavLink} from "react-router-dom";
import "./auth-nav-bar.css";
import Image from 'react-bootstrap/Image';
import UploadButton from "./UploadButton";
import auth from "solid-auth-client";
/**
* Navigation bar which contains de actions of a user loggedin 
*/
const AuthNavBar = (props) => {
  const logOut=()=>{
    auth.logout();
    window.location="/login";
  }
  return (
    <header role="navigation" className="header header__desktop fixed" id="auth">
      <section className="header-wrap">
        <div className="logo-block">
          <NavLink to="/">
            <img src="/img/logo.svg" alt="inrupt" />
          </NavLink>
        </div>
      </section>
      <UploadButton/>
      <div>
        <Image src="/img/logout.svg" className="float-right" onClick={logOut}/>
        <NavLink exact to="/profile" className="link" activeClassName="selected-link">Profile</NavLink>
        <NavLink exact to="/friends" className="link" activeClassName="selected-link">Friends</NavLink>
		<NavLink exact to="/friendsRoutes" className="link" activeClassName="selected-link">FriendsRoutes</NavLink>
        <NavLink exact to="/myRoutes" className="link" activeClassName="selected-link">MyRoutes</NavLink>
        <NavLink exact to="/routesList" className="link" activeClassName="selected-link">RoutesList Example</NavLink>
      </div>
    </header>
  );
};

export default AuthNavBar;
