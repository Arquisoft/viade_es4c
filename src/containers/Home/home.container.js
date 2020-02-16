import React from 'react';
import { NavBar } from "../../components";
import { useWebId } from "@inrupt/solid-react-components";

/**
 * Home component that returns the homepage
 */
export const HomeComponent = () => {
    const webId = useWebId();
    return (
        <div>
            <NavBar webId={webId}/>
            <h1>Home</h1>
            <h2>User: {(webId)? webId: 'Not logged in'}</h2>
        </div>
    );
};
