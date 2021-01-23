import React, { Component } from "react";
import SubjectsUpper from "./upperlayer/subjectsupper";
import {
  handleLevelChangeAction,
  getAllSubjectssAction,
  getAllStudentsAction,
  getOneStudentAction
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
    const { levelid } = this.state;
    this.props.getAllSubjectssAction(levelid);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { levelid } = this.state;

    if (prevProps.levelid !== this.props.levelid) {
      this.props.getAllSubjectssAction(levelid);
    }
  }

  componentWillReceiveProps({ levelid, subjects, type, students }) {
    
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
        this.setState({ Subjects: subjects});
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

  handleSearchStudent=(queryString)=>{
    const {levelid,academicYear}=this.state;   
    this.setState({
      students:[],
    })
    this.props.getOneStudentAction(levelid,"2020-2021",queryString);
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
    const { Subjects, displayNoDataFound, showModal,students ,levelid} = this.state;
    console.log(levelid)
    const { role } = cookie.load("user");
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
          <span className="">There are {Subjects.length} subects P {levelid} </span>
        </div>
        <SubjectList
          subjects={Subjects}
          displayNoDataFound={displayNoDataFound}
          students={students}
          handleSearchStudent={this.handleSearchStudent}
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
  getOneStudentAction
})(Subjects);
