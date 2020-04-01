import React, {Fragment} from "react";
import "./App.css";
import "mdbreact/dist/css/mdb.css";
import "./bootstrap.min.css";
import Routes from "./routes";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

function App() {
	return (
		<Fragment>
			<Routes/>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnVisibilityChange
				draggable
				pauseOnHover
			/>
		</Fragment>
	);
}

export default App;
