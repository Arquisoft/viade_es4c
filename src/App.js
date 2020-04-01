import React, {Fragment} from "react";
import Routes from "./routes";
import {ToastContainer} from "react-toastify";
import "./App.css";
import "mdbreact/dist/css/mdb.css";
import "./bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

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
