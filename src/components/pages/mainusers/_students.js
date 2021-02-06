import React, { Component } from "react";
import {
  getAllStudentsAction,
  handleLevelChangeAction,
  getOneStudentAction,
  disableSearchBox,
  handleTotalPageAction
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
      totalStudentPages:0,
      currentPage:1,
    };
  }

  componentWillMount() {
    const { levelid,academicYear,currentPage } = this.state;
    this.props.getAllStudentsAction(levelid,academicYear,currentPage,"defaultloadint")
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { levelid,academicYear,currentPage } = this.state;
    const {totalPages}=this.props;
    if (prevProps.levelid !== this.props.levelid) {
      this.props.getAllStudentsAction(levelid,academicYear,currentPage,"defaultloadint");
    }
    if (prevState.academicYear !== this.state.academicYear) {
      this.props.getAllStudentsAction(levelid,academicYear,currentPage,"defaultloadint");
    }
    if(prevProps.totalPages!==totalPages){
      this.props.handleTotalPageAction(totalPages);
    }

  }

  componentWillReceiveProps({ allStudents, levelid ,type,getOneType,foundStudent,paginationType,paginatedStudents}) {
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
    if(paginationType==="loading-pagination"){
    //  this.setState({ students: [] });
   // this.setState({ displayNoDataFound: true });
    this.setState({ students: [] }); 
    }else if(paginationType==="success-pagination"){
      this.setState({ displayNoDataFound: false });
      this.setState({ students: paginatedStudents }); 
    }else if(paginationType==="error-paginaton"){
      this.setState({ displayNoDataFound: true });
      this.setState({ students: [] }); 
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
    const { students, levelid, displayNoDataFound, showModal,showBackToStudents,totalStudentPages ,academicYear} = this.state;
    
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
            THere are {students.length} Students on this page
          </span>
        </div>
        <StudentList
          students={students}
          displayNoDataFound={displayNoDataFound}
          handleSearchStudent={this.handleSearchStudent}
          showBackToStudents={showBackToStudents}
          handleBackToStudentList={this.handleBackToStudentList}
          studentData={{levelid:levelid,academicYear:academicYear}}
          totalStudentPages={totalStudentPages}
        />
       
      </div>
    );
  }
}

const mapStateToProps = ({ studentReducer,disableSearchReducer,getOneStudentReducer,paginationStudentReducer }) => {
//console.log("Total pages",studentReducer.totalPages)
  return {
    levelid: studentReducer.payload,
    allStudents:studentReducer.students,
    type:studentReducer.type,
    getOneType:getOneStudentReducer.type,
    foundStudent:getOneStudentReducer.students,
    totalPages:studentReducer.totalPages,
    paginatedStudents:paginationStudentReducer.students,
    paginationType:paginationStudentReducer.type
  };
};

export default connect(mapStateToProps, {
  getAllStudentsAction,
  handleLevelChangeAction,
  getOneStudentAction,
  disableSearchBox,
  handleTotalPageAction
})(Students);
