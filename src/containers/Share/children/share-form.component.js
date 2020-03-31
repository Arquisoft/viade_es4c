import React from "react";
import { NotificationTypes } from "@inrupt/solid-react-components";
import { notificationHelper} from "../../../utils";

const ShareFormComponent = ({
    webId,
    friend,
    setFriend,
    route,
    setRoute,
    sendNotification
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        shareRoute();
    };

    const shareRoute = async () => {
        const licenseUrl = "https://creativecommons.org/licenses/by-sa/4.0/";
        const inboxes = await notificationHelper.findUserInboxes([
            { path: friend, name: "Global" }
        ]);

        const to = inboxes[0];
        const target = friend;

        await sendNotification(
            {
                title: "Route share",
                summary: "has shared you a route.",
                actor: webId,
                object: route,
                target
            },
            to.path,
            NotificationTypes.OFFER,
            licenseUrl
        );
    };

    return (
        <form onSubmit={handleSubmit}>
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
