import React, { Fragment } from "react";
import "./App.css";
import "mdbreact/dist/css/mdb.css";
import "./bootstrap.min.css";
import Routes from "./routes";
import { ToastContainer ,toast, Slide} from 'react-toastify';

function App() {
  return (
    <Fragment>
      <Routes />
      <ToastContainer
        {...{
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
          newestOnTop: true,
          closeOnClick: true,
          pauseOnVisibilityChange: true,
          draggable: true,
          className: "viade-toaster-container",
          toastClassName: "viade-toaster",
          bodyClassName: "viade-toaster-body",
          transition: Slide
        }}
      />
    </Fragment>
  );
}

export default App;
