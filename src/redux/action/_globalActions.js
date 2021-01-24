import actionTypes from "./_actionTypes";

export const disableSearchBox = (disable)=>(dispatch)=>{
    dispatch({
        type: "DISABLE_SEARCH",
      payload: disable,
    })
  }
  export const setStudnetFilterData = (levelid,academicYear)=>(dispatch)=>{
    dispatch({
        type: actionTypes.SET_STUDENT_FILTER_DATA,
      payload: {levelid,academicYear},
    })
  }