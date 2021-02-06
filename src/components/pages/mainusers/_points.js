import React, { Component } from "react";
import {
  getAllPointsAction,
  handleLevelChangeAction,
  getPointsByStudentAction,
  handleMarksTotalPageAction,
} from "../../../redux/action";
import { connect } from "react-redux";
import queryString from "query-string";
import PointsLevelList from "./upperlayer/pointsUpper";
import PointList from "./lists/pointlist";
import { $ } from "react-jquery-plugin";
class Points extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Points: [],
      isLoading: false,
      displayNoDataFound: false,
      showModal: false,
      academicYear: "2020-2021",
      term: "1",
      showBackToPoints: false,
      currentPage: 1,
    };
    this.params = queryString.parse(props.location.search);
  }

  componentWillMount() {
    const { levelid, subjectname } = this.params;
    const { term, academicYear, currentPage } = this.state;
    this.props.getAllPointsAction(
      levelid,
      subjectname,
      term,
      academicYear,
      currentPage
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { term, academicYear, currentPage } = this.state;
    const { levelid, subjectname } = this.params;
    const { totalPages } = this.props;

    if (prevState.term !== term) {
      this.props.getAllPointsAction(
        levelid,
        subjectname,
        term,
        academicYear,
        currentPage
      );
    }

    if (prevState.academicYear !== academicYear) {
      this.props.getAllPointsAction(
        levelid,
        subjectname,
        term,
        academicYear,
        currentPage
      );
    }
    if (prevProps.totalPages !== totalPages) {
      this.props.handleMarksTotalPageAction(totalPages);
    }
  }

  componentWillReceiveProps({ points, type, filteredMarks, filterType,paginatedPoints,paginationType }) {
    if (type === "error-get-point") {
      this.setState({ displayNoDataFound: true });
      this.setState({ Points: [] });
    } else {
      if (points.length > 0) {
        this.setState({ displayNoDataFound: false });
        this.setState({ Points: points });
      }
    }

    if (filterType === "success-get-marks-by-student") {
      console.log("Marks filter type",filterType)
      $("#progresssdotfull").addClass("progressdothide");
      this.setState({ displayNoDataFound: false });
      this.setState({ Points: filteredMarks });
      this.setState({ showBackToPoints: true });
      ///error-get-marks-by-student
      //error-get-marks-by-student
    } 
    else if (filterType === "error-get-marks-by-student") {
      console.log("Marks filter type",filterType)
      $("#progresssdotfull").addClass("progressdothide");
      this.setState({ displayNoDataFound: true });
      this.setState({ Points: filteredMarks });
      this.setState({ showBackToPoints: true });
    } 
    else if (filterType === "loading-get-marks-by-student") {
      $("#progresssdotfull").removeClass("progressdothide");
    }



    if(paginationType==="loading-get-pagination-point"){
      this.setState({ Points: [] });
  
    }else if(paginationType==="success-get-pagination-point"){
      this.setState({ displayNoDataFound: false });
        this.setState({ Points: paginatedPoints });
    }else if(paginationType==="error-get-pagination-point"){
      this.setState({ displayNoDataFound: true });
      this.setState({ Points: [] });
    }
    
  }
  handleBack() {
    window.location.href = "/subjects";
  }

  handleHideModal() {
    this.setState({
      showModal: false,
    });
  }

  handleyearChange(year) {
    this.setState({
      academicYear: year,
    });
  }
  handleTermChange(selectedTerm) {
    this.setState({
      term: selectedTerm,
    });
  }
  handleSearchByStudent(query) {
    const { levelid, subjectname } = this.params;
    const { term, academicYear } = this.state;
    this.props.getPointsByStudentAction(
      levelid,
      subjectname,
      term,
      academicYear,
      query
    );
  }

  render() {
    const {
      Points,
      displayNoDataFound,
      showModal,
      term,
      showBackToPoints,
      academicYear,
    } = this.state;
    const { subjectname, levelid } = this.params;

    return (
      <div className="d-block">
        <PointsLevelList
          handleTermChangeEvent={this.handleTermChange.bind(this)}
          handleBack={this.handleBack.bind(this)}
          handleYearChange={this.handleyearChange.bind(this)}
        />
        <div className="breadcrumb mb-4 breadcrumb-item active message-container">
          <span className="">
            Marks of {subjectname} in P {levelid} for Term {term}
          </span>
        </div>
        <PointList
          points={Points}
          displayNoDataFound={displayNoDataFound}
          handleSearchByStudent={this.handleSearchByStudent.bind(this)}
          showBackToPoints={showBackToPoints}
          pointsData={{
            levelid: levelid,
            subjectname: subjectname,
            term: term,
            academicYear: academicYear,
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  getPointsReducer,
  getMarksByStudentReducer,
  getPaginationPointsReducer,
}) => {

  return {
    points: getPointsReducer.points,
    type: getPointsReducer.type,
    filteredMarks: getMarksByStudentReducer.points,
    filterType: getMarksByStudentReducer.type,
    totalPages: getPointsReducer.totalPages,
    paginatedPoints: getPaginationPointsReducer.points,
    paginationType:getPaginationPointsReducer.type
  };
};

export default connect(mapStateToProps, {
  getAllPointsAction,
  handleLevelChangeAction,
  getPointsByStudentAction,
  handleMarksTotalPageAction,
})(Points);
