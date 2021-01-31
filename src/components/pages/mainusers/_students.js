import React, { Component } from "react";
import {
  getAllStudentsAction,
  handleLevelChangeAction,
  getOneStudentAction,
  disableSearchBox
} from "../../../redux/action";
import { connect } from "react-redux";
import StudentList from "./lists/studentList";
import LevelList from "./upperlayer/levelselector";
import Addstudentmodal from "./modals/addStudentModal";
import {$} from "react-jquery-plugin";
class Students extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      isLoading: false,
      levelid: 1,
      displayNoDataFound: false,
      showModal: false,
      academicYear:"2020-2021",
      showBackToStudents:false,
      showProgress:false,
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

  componentWillReceiveProps({ allStudents, levelid ,type,getOneType,foundStudent}) {
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
        // (()=>{this.props.disableSearchBox(false);})
      }
    }
    if(getOneType==="success-get-one-student"){
      $("#progresssdotfull").addClass("progressdothide")
      this.setState({ students: foundStudent });
      this.setState(
        {
          showBackToStudents:true
        }
      )
    }else if(getOneType==="error-get-one-student"){

     
      $("#progresssdotfull").addClass("progressdothide")
      this.setState(
        {
          showBackToStudents:true,
        }
      )
      this.setState({ displayNoDataFound: true });
      this.setState({ students: foundStudent });
    }else if(getOneType==="loading-get-one-student"){
      $("#progresssdotfull").removeClass("progressdothide")
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
    this.props.disableSearchBox(false);
    this.setState({
      academicYear
    })
  }
  handleSearchStudent=(queryString)=>{
   const {levelid,academicYear}=this.state;   
   this.setState({
     students:[],
   })
   this.props.getOneStudentAction(levelid,academicYear,queryString);
   this.props.disableSearchBox(true);
  }


  handleBackToStudentList=()=>{
    const {levelid,academicYear}=this.state;   
   this.setState({
     students:[],
   })
   this.props.getAllStudentsAction(levelid,academicYear);
  }

  render() {
    const { students, levelid, displayNoDataFound, showModal,showBackToStudents } = this.state;
    return (
      <div className="d-block"> 
         <Addstudentmodal
          show={showModal}
          onHide={() => this.setState({ showModal: false })}
        />
        <LevelList
          handelLevelChange={this.props.handleLevelChangeAction}
          handleDisableSearch={this.props.disableSearchBox}
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
          handleSearchStudent={this.handleSearchStudent}
          showBackToStudents={showBackToStudents}
          handleBackToStudentList={this.handleBackToStudentList}
        />
       
      </div>
    );
  }
}

const mapStateToProps = ({ studentReducer,disableSearchReducer,getOneStudentReducer }) => {

  return {
    levelid: studentReducer.payload,
    allStudents:studentReducer.students,
    type:studentReducer.type,
    getOneType:getOneStudentReducer.type,
    foundStudent:getOneStudentReducer.students
    //  disableSearch:disableSearchReducer.disableSearch
  };
};

export default connect(mapStateToProps, {
  getAllStudentsAction,
  handleLevelChangeAction,
  getOneStudentAction,
  disableSearchBox
})(Students);
