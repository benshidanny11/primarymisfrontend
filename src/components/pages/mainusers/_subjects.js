import React, { Component } from "react";
import SubjectsUpper from "./upperlayer/subjectsupper";
import {
  handleLevelChangeAction,
  getAllSubjectssAction,
} from "../../../redux/action";
import { connect } from "react-redux";
import _ from "lodash";
import SubjectList from "./lists/subjectList";
import AddSubjectModal from "./modals/addSubjectModal";
class Subjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Subjects: [],
      displayNoDataFound: false,
      showModal: false,
    };
    this.handleEvent = this.handleEvent.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { levelid } = this.state;

    if (prevProps.levelid !== this.props.levelid) {
      this.props.getAllSubjectssAction(levelid);
    }
  }

  componentWillReceiveProps({ levelid, subjects, type }) {
    console.log(type);
    if (levelid) {
      this.setState({
        levelid: levelid,
      });
    }
    if (subjects) {
      if (subjects.length === 0) {
        this.setState({ displayNoDataFound: true });
        this.setState({ Subjects: subjects });
      } else {
        this.setState({ displayNoDataFound: false });
        this.setState({ Subjects: subjects });
      }
    }
  }
  componentWillMount() {
    this.props.getAllSubjectssAction();
  }

  handleEvent() {}
  handler = () => {
    this.setState();
  };
  handleShowModal() {
    this.setState({
      showModal: true,
    });
  }

  render() {
    const { Subjects, displayNoDataFound, showModal } = this.state;
    //  console.log(Subjects)
    return (
      <div className="d-block">
        <AddSubjectModal
          show={showModal}
          onHide={() => this.setState({ showModal: false })}
        />
        <SubjectsUpper
          handelLevelChange={this.props.handleLevelChangeAction}
          handleShowModal={this.handleShowModal.bind(this)}
        />
        <div className="breadcrumb mb-4 breadcrumb-item active message-container">
          <span className="">THere are {Subjects.length} subects.</span>
        </div>
        <SubjectList
          subjects={Subjects}
          displayNoDataFound={displayNoDataFound}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ studentReducer, getAllSubjectsReducer }) => {
  // console.log(getAllSubjectsReducer.Subjects);
  return {
    levelid: studentReducer.payload,
    subjects: getAllSubjectsReducer.Subjects,
    type: getAllSubjectsReducer.type,
  };
};

export default connect(mapStateToProps, {
  handleLevelChangeAction,
  getAllSubjectssAction,
})(Subjects);
