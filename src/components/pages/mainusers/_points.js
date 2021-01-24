import React, { Component } from "react";
import {
  getAllPointsAction,
  handleLevelChangeAction,
  getPointsByStudentAction
} from "../../../redux/action";
import { connect } from "react-redux";
import queryString from "query-string";
import PointsLevelList from "./upperlayer/pointsUpper";
import PointList from "./lists/pointlist";
import {$} from "react-jquery-plugin";
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
      showBackToPoints:false,
    };
    this.params = queryString.parse(props.location.search);
  }

  componentWillMount() {
    const { levelid, subjectname } = this.params;
    const { term, academicYear } = this.state;
    this.props.getAllPointsAction(levelid, subjectname, term, academicYear);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { term, academicYear } = this.state;
    const { levelid, subjectname } = this.params;

    if (prevState.term !== term) {
      this.props.getAllPointsAction(levelid, subjectname, term, academicYear);
    }

    if (prevState.academicYear !== academicYear) {
      this.props.getAllPointsAction(levelid, subjectname, term, academicYear);
    }
  }

  componentWillReceiveProps({ points, type ,filteredMarks,filterType}) {
    if (type === "error-get-point") {
      this.setState({ displayNoDataFound: true });
      this.setState({ Points: [] });
    } else {
      if (points.length > 0) {
        this.setState({ displayNoDataFound: false });
        this.setState({ Points: points });
      }
    }

    if(filterType==="success-get-marks-by-student"){
      $("#progresssdotfull").addClass("progressdothide")
      this.setState({ displayNoDataFound: false });
      this.setState({ Points: filteredMarks });
      this.setState({showBackToPoints:true})
    }else if(filterType==="error-get-marks-by-student")
    {
      $("#progresssdotfull").addClass("progressdothide")
      this.setState({ displayNoDataFound: true });
      this.setState({ Points: [] });
      this.setState({showBackToPoints:true})
    }else if(filterType==="loading-get-marks-by-student"){
      $("#progresssdotfull").removeClass("progressdothide")
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
  handleSearchByStudent(query){
    const { levelid, subjectname } = this.params;
    const { term, academicYear } = this.state;
    this.props.getPointsByStudentAction(levelid,subjectname,term,academicYear,query);
  }

  render() {
    const { Points, displayNoDataFound, showModal, term,showBackToPoints } = this.state;
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
        <PointList points={Points} displayNoDataFound={displayNoDataFound} handleSearchByStudent={this.handleSearchByStudent.bind(this)} showBackToPoints={showBackToPoints} redirectData={{levelid:levelid,subjectname:subjectname}}/>
      </div>
    );
  }
}

const mapStateToProps = ({ getPointsReducer,getMarksByStudentReducer }) => {
  return {
    points: getPointsReducer.points,
    type: getPointsReducer.type,
    filteredMarks:getMarksByStudentReducer.points,
    filterType:getMarksByStudentReducer.type
  };
};

export default connect(mapStateToProps, {
  getAllPointsAction,
  handleLevelChangeAction,
  getPointsByStudentAction,
})(Points);
