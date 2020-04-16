import React from "react";
import { NotificationTypes } from "@inrupt/solid-react-components";
import {storageHelper} from "../../../viade";
import { errorToaster, successToaster } from "../../../utils";

const ShareFormComponent = ({
    webId,
    friend,
    setFriend,
    route,
    setRoute,
    sendNotification
}) => {


    const shareRoute = async () => {
        try{
            const licenseUrl = "https://creativecommons.org/licenses/by-sa/4.0/";
            const to = storageHelper.getInboxFolder(friend);
            console.log(to);
            const target = friend;

            await sendNotification(
                {
                    title: "Route share",
                    summary: "has shared you a route.",
                    actor: webId,
                    object: route,
                    target
                },
                to,
                NotificationTypes.OFFER,
                licenseUrl
            );
            successToaster("The route has been shared!!");
            }catch(error){
                console.error(error);
                errorToaster("An error has occurred sharing the route");
            }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await shareRoute();
        document.getElementById("share-form").reset();

    };

    return (
        <form onSubmit={handleSubmit} id="share-form">
            <label>
                Route's webID:
        <input
                    type="text"
                    name="route"
                    onChange={(e) => setRoute(e.target.value)}
                />
            </label>
            <label>
                Insert your friend's webID:
        <input
                    type="text"
                    name="friend"
                    onChange={(e) => setFriend(e.target.value)}
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
};

export default ShareFormComponent;
