import React from "react";
import data from "@solid/query-ldflex";
import { useWebId } from "@inrupt/solid-react-components";

const ProfileComponent = () => {
    const webID = useWebId();
    return (
        <div>
            <p>.</p>
            <p>.</p>
            <h1>Profile</h1>
        </div>
    );
};

export default ProfileComponent;