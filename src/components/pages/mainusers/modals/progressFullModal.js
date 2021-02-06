import React from "react";

import Loader from "react-loader-spinner";



export const ProgressFull=({ onClose, open }) =>{

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      // progressdothide
      className="progresssdotfull progressdothide"
      id="progresssdotfull"
    >
      <Loader type="ThreeDots" color="#1168ca" height="20" width="50" >
      </Loader>
    </div>
  );
}


export const ProgressFullPoints=({ onClose, open }) =>{

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      // progressdothide
      className="progresssdotfullP progressdothide"
      id="progresssdotfull"
    >
      <Loader type="ThreeDots" color="#1168ca" height="20" width="50" >
      </Loader>
    </div>
  );
}

