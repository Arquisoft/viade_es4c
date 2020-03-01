import React from "react";
import data from "@solid/query-ldflex";
import { useWebId } from "@inrupt/solid-react-components";
import {Spacer} from "../../components";

const ProfileComponent = () => {
    const webID = useWebId();
    return (
        <div>
            <Spacer/>
            <h1>Profile</h1>
        </div>
    );
};

export default ProfileComponent;