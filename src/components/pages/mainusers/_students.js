import React, { Component } from "react";
import {
  getAllStudentsAction,
  handleLevelChangeAction,
} from "../../../redux/action";
import { connect } from "react-redux";
import StudentList from "./lists/studentList";
import LevelList from "./upperlayer/levelselector";
import Addstudentmodal from "./modals/addStudentModal";
class Students extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      isLoading: false,
      levelid: 1,
      displayNoDataFound: false,
      showModal: false,
      academicYear:"2020-2021"
    };
  }

  componentDidMount() {
    const { levelid,academicYear } = this.state;
    this.props.getAllStudentsAction({levelid,academicYear})
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { levelid,academicYear } = this.state;

    if (prevProps.levelid !== this.props.levelid) {
      this.props.getAllStudentsAction({levelid,academicYear});
    }
    if (prevState.academicYear !== this.state.academicYear) {
      this.props.getAllStudentsAction({levelid,academicYear});
    }
  }

  componentWillReceiveProps({ allStudents, levelid }) {
    if (levelid) {
      this.setState({
        levelid,
      });
    }
    if (allStudents) {
      if (allStudents.length === 0) {
        this.setState({ displayNoDataFound: true });
        this.setState({ students: allStudents });
      } else {
        this.setState({ displayNoDataFound: false });
        this.setState({ students: allStudents });
      }
    }
  }
  handleShowModal() {
    this.setState({
      showModal: true,
    });
  }

  handleHideModal() {
    this.setState({
      showModal: false,
    });
  }

  componentWillUnmount() {}
  handleEvent() {}
  handler = () => {
    this.setState();
  };
  handleYearChange=(academicYear)=>{
    console.log(academicYear)
    this.setState({
      academicYear
    })
  }

  render() {
    const { students, levelid, displayNoDataFound, showModal } = this.state;
    return (
      <div className="d-block"> 
         <Addstudentmodal
          show={showModal}
          onHide={() => this.setState({ showModal: false })}
        />
        <LevelList
          handelLevelChange={this.props.handleLevelChangeAction}
          handleShowModal={this.handleShowModal.bind(this)}
          handleYearChange={this.handleYearChange.bind(this)}
        />
        <div className="breadcrumb mb-4 breadcrumb-item active message-container">
          <span className="">
            THere are {students.length} Students in P {levelid}
          </span>
        </div>
        <StudentList
          students={students}
          displayNoDataFound={displayNoDataFound}
        />
       
      </div>
    );
  }
}

const mapStateToProps = ({ studentReducer }) => {
  console.log(studentReducer);
  return {
    levelid: studentReducer.payload,
    allStudents:studentReducer.students
  };
};

export default connect(mapStateToProps, {
  getAllStudentsAction,
  handleLevelChangeAction,
})(Students);
