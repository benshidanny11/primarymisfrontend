import React, { Component } from "react";
import SubjectsUpper from "./upperlayer/subjectsupper";
import {
  handleLevelChangeAction,
  getAllSubjectssAction,
  getAllStudentsAction,
} from "../../../redux/action";
import { connect } from "react-redux";
import _ from "lodash";
import SubjectList from "./lists/subjectList";
import AddSubjectModal from "./modals/addSubjectModal";
import cookie from "react-cookies";
class Subjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Subjects: [],
      displayNoDataFound: false,
      showModal: false,
      students: [],
      levelid:1
    };
    this.handleEvent = this.handleEvent.bind(this);
  }

  componentDidMount() {

   
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { levelid } = this.state;

    if (prevProps.levelid !== this.props.levelid) {
      this.props.getAllSubjectssAction(levelid);
    }
  }

  componentWillReceiveProps({ levelid, subjects, type, students }) {
    console.log("students",students)
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
        this.setState({ Subjects: subjects,levelid});
      }
    }
   if(students){
    if (students.length > 0) {
      this.setState({
        students,
      });
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
    const { Subjects, displayNoDataFound, showModal,students } = this.state;
    const { role } = cookie.load("user");
    const subject = Subjects[0];
    return (
      <div className="d-block">
        <AddSubjectModal
          show={showModal}
          onHide={() => this.setState({ showModal: false })}
        />
        {role !== "TEACHER" ? (
          <SubjectsUpper
            handelLevelChange={this.props.handleLevelChangeAction}
            handleShowModal={this.handleShowModal.bind(this)}
          />
        ) : (
          ""
        )}
        <div className="breadcrumb mb-4 breadcrumb-item active message-container">
          <span className="">THere are {Subjects.length} subects.</span>
        </div>
        <SubjectList
          subjects={Subjects}
          displayNoDataFound={displayNoDataFound}
          students={students}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ studentReducer, getAllSubjectsReducer }) => {
  console.log("students",studentReducer.students)
  return {
    levelid: studentReducer.payload,
    subjects: getAllSubjectsReducer.Subjects,
    type: getAllSubjectsReducer.type,
    students: studentReducer.students,
  };
};

export default connect(mapStateToProps, {
  handleLevelChangeAction,
  getAllSubjectssAction,
  getAllStudentsAction,
})(Subjects);
