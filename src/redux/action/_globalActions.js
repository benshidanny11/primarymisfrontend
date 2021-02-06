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
  export const handleNextPageChange=(currentPage)=> (dispatch)=>{
    dispatch({
      type: actionTypes.PAGE_NEXT_ACTION,
      payload: currentPage,
    });
  }
  export const handleTotalPageAction=(totalPages)=>(dispatch)=>{
    dispatch({
      type: actionTypes.TOTAL_PAGE,
      payload: totalPages,
    });
  }
  export const handlePreviousPageChange=(currentPage)=> (dispatch)=>{
    dispatch({
      type: actionTypes.PAGE_PREV_ACTION,
      payload: currentPage,
    });
  }
  

  export const handleMarksNextPageChange=(currentPage)=> (dispatch)=>{
    dispatch({
      type: actionTypes.POINT_PAGE_NEXT_ACTION,
      payload: currentPage,
    });
  }

  export const handleMarksTotalPageAction=(totalPages)=>(dispatch)=>{
    dispatch({
      type: actionTypes.POINT_TOTAL_PAGE,
      payload: totalPages,
    });
  }
  export const handleMarksPreviousPageChange=(currentPage)=> (dispatch)=>{
    dispatch({
      type: actionTypes.POINT_PAGE_PREV_ACTION,
      payload: currentPage,
    });
  }


  export const handleUserNextPageChange=(currentPage)=> (dispatch)=>{
    dispatch({
      type: actionTypes.USER_PAGE_NEXT_ACTION,
      payload: currentPage,
    });
  }

  export const handleUserTotalPageAction=(totalPages)=>(dispatch)=>{
    dispatch({
      type: actionTypes.USER_TOTAL_PAGE,
      payload: totalPages,
    });
  }
  export const handleUserPreviousPageChange=(currentPage)=> (dispatch)=>{
    dispatch({
      type: actionTypes.USER_PAGE_PREV_ACTION,
      payload: currentPage,
    });
  }



  