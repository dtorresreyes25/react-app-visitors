import React from 'react';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainerHelper = (props) => {
  return (
    <>
    	 <ToastContainer
    	 {...props}
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </>
  )
}

export default ToastContainerHelper;


//