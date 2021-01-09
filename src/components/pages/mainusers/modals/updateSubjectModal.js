import React, { Component } from "react";
import {
  getAllTeachersAction,
  updateSubjectAction,
} from "../../../../redux/action";
import { connect } from "react-redux";
import _ from "lodash";
import { Modal, Button as BtnModal } from "react-bootstrap";
import Progress from "./progressModal";
import { $ } from "react-jquery-plugin";
import { ToastContainer, toast } from "react-toastify";
import { handleCreateErrorToast } from "../../../../utils/showToastUtil";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { CustomButton, CustomCancelButton } from "../styledcontrols/buttons";

const styles = (theme) =>
  createStyles({
    button: {
      backgroundColor: "red",
    },
  });

class UpdateSubjectModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levelid: 1,
      teachers: [],
      showProgress: false,
      hideModal: false,
      showResponseModal: false,
      subjectName:null,
      catMaximum:null,
      examMaximum:null,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (prevProps !== this.props) {
      if (this.props.subjectResponse.type === "loading-update-subject") {
        $("#dotprogress").removeClass("dotprogress");
        console.log("Response", this.props.subjectResponse);
      } else if (this.props.subjectResponse.type === "error-update-subject") {
        $("#dotprogress").addClass("dotprogress");
        console.log(
          "Error",
          this.props.subjectResponse.payload
        );
        handleCreateErrorToast(
          this.props.subjectResponse.payload.data.message,
          toast
        );
      } else if (this.props.subjectResponse.type === "success-update-subject") {
        console.log("Response", this.props.createStudentResponse);
        this.setState({
          showResponseModal: true,
        });
        $("#dotprogress").addClass("dotprogress");
      }
    }
  }
  componentWillReceiveProps({ Teachers }) {
    this.setState({
      teachers: Teachers,
    });
  }

 
 

  handleSubjectNameEvent(e){
   this.setState({
    subjectName:e.target.value
   })
}
handleCatMaxEvent(e){
    this.setState({
        catMaximum:e.target.value
    })
 }

 handleExamMaxEvent(e){
    this.setState({
        examMaximum:e.target.value
    })
 }


  handleLevelChangeEvent(e) {}
  handleStudentSubmit(e) {
    e.preventDefault();
  const {subject}=this.props;
    const subjectData = {
      subjectname:subject.subjectname,
      catmax: e.target.catmaximum.value,
      exammax: e.target.exammax.value,
      levelid: subject.levelid,
      teacherid: e.target.subjectteacher.value,
      subjectNameToUpdate: e.target.subjectname.value
    };
   
     this.props.updateSubjectAction(subjectData);
   
  }

  handler = () => {
    this.setState();
  };

  handleHideModal = () => {
    this.setState({
      showResponseModal: false,
    });
    window.location.href = "/subjects";
  };

  handleRedirect = () => {
    window.location.href = "/subjects";
  };
  componentWillMount() {
    this.props.getAllTeachersAction();
  }
  render() {
    const { showProgress, teachers, showResponseModal ,subjectName,catMaximum,examMaximum} = this.state;
    const {subject}=this.props;
    return (
      <div>
        {!showResponseModal ? (
          <Modal
            {...this.props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton={true}>
              <Modal.Title id="contained-modal-title-vcenter">
                Update subject Information
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Progress open={showProgress} />
              <form onSubmit={this.handleStudentSubmit.bind(this)}>
                <div className="form-group ">
                  <label htmlFor="firstname" className="col-form-label">
                    Subject name:
                  </label>
                  <input
                    type="text"
                    className="form-control selector"
                    id="firstname"
                    name="subjectname"
                    required
                    onChange={this.handleSubjectNameEvent.bind(this)}
                    value={subjectName!==null?subjectName:subject.subjectname}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="col-form-label">
                    Cat maximum:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="catmaximum"
                    name="catmaximum"
                    required
                    onChange={this.handleCatMaxEvent.bind(this)}
                    value={catMaximum!==null?catMaximum:subject.catmax}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exammax" className="col-form-label">
                    Exam maximun:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exammax"
                    name="exammax"
                    required
                    onChange={this.handleExamMaxEvent.bind(this)}
                    value={examMaximum!==null?examMaximum:subject.exammax}
                  />
                </div>
              
                <div className="form-group">
                  <label htmlFor="subjectteacher" className="col-form-label">
                    Teached by:
                  </label>
                  <select
                    type="text"
                    className="form-control"
                    id="subjectteacher"
                    name="subjectteacher"
                    required
                  >
                    <option value={subject.teacherid}>
                      {subject.names}
                    </option>
                    {teachers ? (
                      teachers.map((teacher) => (
                        <option value={teacher.userid} key={teacher.userid}>
                          {teacher.names}
                        </option>
                      ))
                    ) : (
                      <option value="">No teachers found</option>
                    )}
                  </select>
                </div> 
                <Modal.Footer id="footer">
                  <div className="btn-container">
                    <CustomCancelButton
                      type="button"
                      className="btn-cancel"
                      handleHide={this.props.onHide}
                      label="Cancel"
                    />

                    <CustomButton
                      type="submit"
                      label="Update subject"
                      className="btn-submit"
                    />
                  </div>
                </Modal.Footer>
              </form>
            </Modal.Body>
          </Modal>
        ) : (
          <Modal
            show={showResponseModal}
            onHide={this.handleHideModal.bind(this)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Subject update</Modal.Title>
            </Modal.Header>
            <Modal.Body> Subject is updated successfully</Modal.Body>
            <Modal.Footer>
              <CustomCancelButton
                type="button"
                className="btn-cancel"
                handleHide={this.handleRedirect.bind(this)}
                label="Okay"
              />
            </Modal.Footer>
          </Modal>
        )}

        <ToastContainer />
      </div>
    );
  }
}
const mapStateToProps = ({
  getAllTeachersReducer,
  updateSubjectReducer,
}) => {
  return {
    Teachers: getAllTeachersReducer.teachers,
    subjectResponse:updateSubjectReducer
  };
};

export default connect(mapStateToProps, {
  updateSubjectAction,
  getAllTeachersAction
})(UpdateSubjectModal);
