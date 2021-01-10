import React, { Component } from "react";
import {
  getAllPointsAction,
  handleLevelChangeAction,
} from "../../../redux/action";
import { connect } from "react-redux";
import queryString from "query-string";
import PointsLevelList from "./upperlayer/pointsUpper";
import PointList from "./lists/pointlist";
class Points extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Points: [],
      isLoading: false,
      displayNoDataFound: false,
      showModal: false,
      academicYear:"2020-2021",
      term:"1"
    }
    this.params=queryString.parse(props.location.search);
  }

  componentWillMount() {
    const { levelid,subjectname } = this.params;
    const {term,academicYear}=this.state;
    this.props.getAllPointsAction(levelid,subjectname,term,academicYear);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {term,academicYear } = this.state;
    const { levelid,subjectname } = this.params;

    if (prevState.term !== term) {
      this.props.getAllPointsAction(levelid,subjectname,term,academicYear);
    }

    if (prevState.academicYear !== academicYear) {
      this.props.getAllPointsAction(levelid,subjectname,term,academicYear);
    }
  }

  componentWillReceiveProps({ points }) {
   console.log(points)
    if (points) {
      if (points.length === 0) {
        this.setState({ displayNoDataFound: true });
        this.setState({ Points: points });
      } else {
        this.setState({ displayNoDataFound: false });
        this.setState({ Points: points });
      }
    }
  }
  handleBack() {
  window.location.href="/subjects"
  }

  handleHideModal() {
    this.setState({
      showModal: false,
    });
  }


  handleyearChange(year){
   this.setState({
     academicYear:year
   })
  }
  handleTermChange(selectedTerm){
    this.setState({
      term:selectedTerm
    })
  }

  render() {
    const { Points, displayNoDataFound, showModal,term } = this.state;
    const { subjectname ,levelid} = this.params;
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
        />
       
      </div>
    );
  }
}

const mapStateToProps = ({ getPointsReducer }) => {
 console.log(getPointsReducer);
  return {
    points:getPointsReducer.points
  };
};

export default connect(mapStateToProps, {
  getAllPointsAction,
  handleLevelChangeAction,
})(Points);
