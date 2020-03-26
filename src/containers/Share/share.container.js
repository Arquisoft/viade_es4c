import React,{useState,useCallback} from "react";
import {ShareFormComponent} from "./children";
import {useNotification} from '@inrupt/solid-react-components';
import "./share-container.css";

const ShareComponent = (props)=> {
  const [friend, setFriend] = useState('');
  const[route,setRoute]=useState('');
    const {webId}=props;
    const { createNotification} = useNotification(webId);

    const sendNotification=useCallback(
      async (content, to, type, license) => {
        try {
          await createNotification(content, to, type, license);
        } catch (error) {
          alert('Error: ShareComponent > sendNotification');
        }
      },
      [  createNotification]
    );

    return (
      <div>
        <p>.</p>
        <p>.</p>
        <h1>Share Routes</h1>
        <ShareFormComponent {...{webId,friend,setFriend,route,setRoute,sendNotification}} ></ShareFormComponent>
      </div>
    );
  
}

export default ShareComponent;
