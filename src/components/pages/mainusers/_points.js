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
      levelid: 1,
      displayNoDataFound: false,
      showModal: false,
    }
    this.params=queryString.parse(props.location.search);
  }

  componentWillMount() {
    const { levelid,subjectname } = this.params;
    this.props.getAllPointsAction(levelid,subjectname);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { levelid } = this.state;
    const { subjectName } = this.props;

    if (prevProps.levelid !== this.props.levelid) {
      this.props.getAllPointsAction(levelid,subjectName);
    }
  }

  componentWillReceiveProps({ points, levelid }) {
    if (levelid) {
      this.setState({
        levelid,
      });
    }
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

  handleEvent() {}
  handler = () => {
    this.setState();
  };

  render() {
    const { Points, displayNoDataFound, showModal } = this.state;
    const { subjectname ,levelid} = this.params;
    return (
      <div className="d-block"> 
      <PointsLevelList
          handelLevelChange={this.props.handleLevelChangeAction}
          handleBack={this.handleBack.bind(this)}
        />
        <div className="breadcrumb mb-4 breadcrumb-item active message-container">
          <span className="">
            Marks of {subjectname} in P {levelid}
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
    console.log(getPointsReducer.points)
 
  return {
    points:getPointsReducer.points
  };
};

export default connect(mapStateToProps, {
  getAllPointsAction,
  handleLevelChangeAction,
})(Points);
