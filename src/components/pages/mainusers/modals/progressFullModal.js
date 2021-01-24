import React from "react";

import Loader from "react-loader-spinner";



export default function ProgressFull({ onClose, open }) {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="progresssdotfull progressdothide"
      id="progresssdotfull"
    >
      <Loader type="ThreeDots" color="#1168ca" height="20" width="50" >
      </Loader>
    </div>
  );
}
