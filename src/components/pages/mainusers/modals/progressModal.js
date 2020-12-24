import React from "react";

import Loader from "react-loader-spinner";



export default function Progress({ onClose, open }) {

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="dotprogress"
      id="dotprogress"
    >
      <Loader type="ThreeDots" color="#1168ca" height="20" width="50" >
      </Loader>
    </div>
  );
}
