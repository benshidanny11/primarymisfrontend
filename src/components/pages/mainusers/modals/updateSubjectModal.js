import React, { Component } from "react";
import {
  getAllTeachersAction,
  createSubjectAction,
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
      showProgress: false,
      hideModal: false,
      showResponseModal: false,
      subjectName:null,
      catMaximum:null,
      examMaximum:null,
    };
  }





  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (!_.isEqual(prevProps.allClasses, this.props.allClasses)) {
    //   this.setState({
    //     classes: this.props.allClasses,
    //   });
    // }
    // if (prevProps !== this.props) {
    //   if (this.props.createStudentResponse.type === "loading-create") {
    //     $("#dotprogress").removeClass("dotprogress");
    //     console.log("Response", this.props.createStudentResponse);
    //   } else if (this.props.createStudentResponse.type === "error-create") {
    //     $("#dotprogress").addClass("dotprogress");
    //     console.log(
    //       "Error",
    //       this.props.createStudentResponse.payload.data.message
    //     );
    //     handleCreateErrorToast(
    //       this.props.createStudentResponse.payload.data.message,
    //       toast
    //     );
    //   } else if (this.props.createStudentResponse.type === "success-create") {
    //     console.log("Response", this.props.createStudentResponse);
    //     this.setState({
    //       showResponseModal: true,
    //     });
    //     $("#dotprogress").addClass("dotprogress");
    //   }
    // }
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

    const subjectData = {
      subjectName: e.target.subjectname.value,
      catMax: e.target.catmaximum.value,
      examMax: e.target.exammax.value,
      levelId: e.target.subjectlevel.value,
      teacherId: e.target.subjectteacher.value,
    };
    this.props.createSubjectAction(subjectData);
    this.setState({
      hideModal: true,
    });
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
  render() {
    const { showProgress, hideModal, showResponseModal ,subjectName,catMaximum,examMaximum} = this.state;
    const {subject}=this.props;
    /*{subjectname: "SOCIAL STUDIES", catmax: 60, exammax: 40, levelid: 2, status: "1"}*/
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
                Register new subject
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
                      label="Add subject"
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
              <Modal.Title>Subject registration</Modal.Title>
            </Modal.Header>
            <Modal.Body> Subject is registered successfully</Modal.Body>
            <Modal.Footer>
              <CustomCancelButton
                type="button"
                className="btn-cancel"
                handleHide={this.handleRedirect.bind(this)}
                label="Okay"
              />
              {/* <BtnModal
                variant="primary"
                onClick={this.handleRedirect.bind(this)}
              >
                Okay
              </BtnModal> */}
            </Modal.Footer>
          </Modal>
        )}

        <ToastContainer />
      </div>
    );
  }
}
const mapStateToProps = ({
  createSubjectReducer,
}) => {

  return {

  };
};

export default connect(mapStateToProps, {
  createSubjectAction,
})(UpdateSubjectModal);
