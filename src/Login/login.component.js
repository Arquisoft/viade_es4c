import React,{Component} from 'react';
import { LoginButton,List,Image,Value,LoggedIn} from '@solid/react';

class Login extends Component{
    render(){
        return (
            <div>
                <p>Login temporal de Viade es4c</p>
                <LoginButton popup="popup.html"/> 
                {/*Comprobación si popup.html funciona*/}
                <LoggedIn>
                    <Image src="user.image" defaultSrc="profile.svg" className="profile"/> {/*No funciona*/}
                    <p>Welcome back, <Value src="user.name"/>.</p>
                    <h2>Friends</h2>
                    <List src="user.friends.firstName"/> {/*No funciona*/}
                </LoggedIn>
            </div>
        );
    }
}

/*
    El código ha sido sacado de: https://github.com/solid/react-components/blob/master/demo/app.jsx
    Otra posible forma de loggearse es con la libreria solid-auth-client, pasandole la uri del popup.html, visualmente hace lo mismo que el LoginButton
*/

export default Login;