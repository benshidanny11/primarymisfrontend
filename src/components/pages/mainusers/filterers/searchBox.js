import React, { useState } from "react";
import { useSelector } from "react-redux";
import {handleCreateErrorToast} from "../../../../utils/showToastUtil"
import { ToastContainer, toast } from "react-toastify";

function SearchBox({handleSearchQuery,placeholder}) {
  const [queryStrying, setQueryString] = useState("");
  const disableSearch=useSelector((state)=>state.disableSearchReducer.disableSearch);
  const handleTextChange = (e) => {
    setQueryString(e.target.value);
  };
  const handleOnSubmitQuery = () => {
      if(queryStrying.length===0){
       handleCreateErrorToast("Please type some thing",toast,1000)
      }else{
       handleSearchQuery(queryStrying);
      }
  };
  return (
    <div>
      <div id="custom-search-input">
        <div className="input-group ">
          <input
            disabled={disableSearch}
            type="text"
            className="form-control input-lg"
            placeholder={placeholder}
            id="inputquery"
            onChange={handleTextChange}
          />

          <button
            className="btn btn-search"
            id="btn-search"
            type="button"
            onClick={handleOnSubmitQuery}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SearchBox;
