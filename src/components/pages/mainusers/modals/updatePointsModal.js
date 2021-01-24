import React, { Component } from "react";
import { updatePointsAction } from "../../../../redux/action";
import { connect } from "react-redux";
import _ from "lodash";
import { Modal, Button as BtnModal } from "react-bootstrap";
import Progress from "./progressModal";
import { $ } from "react-jquery-plugin";
import { ToastContainer, toast } from "react-toastify";
import { handleCreateErrorToast } from "../../../../utils/showToastUtil";

import { CustomButton, CustomCancelButton } from "../styledcontrols/buttons";
import cookie from "react-cookies";

class UpdateMarksModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levelid: 1,
      classes: [],
      showProgress: false,
      hideModal: false,
      showResponseModal: false,
      catOne:null,
      catTwo:null,
      exam:null,
      term:null
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!_.isEqual(prevProps.allClasses, this.props.allClasses)) {
      this.setState({
        classes: this.props.allClasses,
      });
    }
    if (prevProps !== this.props) {
      if (this.props.pointsResponse.type === "loading-update-point") {
        $("#dotprogress").removeClass("dotprogress");
      } else if (this.props.pointsResponse.type === "error-update-point") {
        $("#dotprogress").addClass("dotprogress");
        console.log("Response error",this.props.pointsResponse);
        handleCreateErrorToast(
          this.props.pointsResponse.data.message,
          toast,
          1500,
          this.handlePointRedirect
        );
      } else if (this.props.pointsResponse.type === "success-update-point") {
        this.setState({
          showResponseModal: true,
        });
        $("#dotprogress").addClass("dotprogress");
      }
    }
  }
  componentWillMount() {}

  handleLevelChangeEvent(e) {
    this.props.getClassesAction(e.target.value);
  }
  handleCatOneEvent(e){
   this.setState({
       catOne:e.target.value
   })
  }
  handleCatTwoEvent(e){
    this.setState({
        catTwo:e.target.value
    })
   }
   handleExamEvent(e){
    this.setState({
        exam:e.target.value
    })
   }
  handleStudentSubmit(e) {
    e.preventDefault();
    const { points } = this.props;
    const { userid } = cookie.load("user");

    const pointsData = {
      subjectname: points.subjectname,
      catone: e.target.catonemarks.value,
      cattwo: e.target.cattwomarks.value,
      exam: e.target.exammarks.value,
      levelid: points.levelid,
      studentid: points.studentid,
      teacherid: userid,
    };
    this.props.updatePointsAction(pointsData);
  
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
  handlePointRedirect = () => {
    window.location.href = `/points?levelid=${this.props.points.levelid}&subjectname=${this.props.points.subjectname}`;
  };

  handleRedirect = () => {
    window.location.href = "/subjects";
  };
  render() {
    const {showProgress, showResponseModal,catOne,catTwo,exam } = this.state;
    const { points } = this.props;
  
   
    return (
      <div>
        {!showResponseModal ? (
          <Modal
            {...this.props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            // onHide={() => hideModal}
          >
            <Modal.Header closeButton={true}>
              <Modal.Title id="contained-modal-title-vcenter">
                Update subject marks
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Progress open={showProgress} />
              <form onSubmit={this.handleStudentSubmit.bind(this)}>
                <div className="form-group">
                  <label htmlFor="studentname" className="col-form-label">
                    Student name:
                  </label>
                  <input
                    type="text"
                    className="form-control selector"
                    id="studentname"
                    name="studentname"
                    placeholder={points.studentnames}
                    disabled
                    required
                  />
                </div>
                <div className="form-group controlcontainer">
                  <label htmlFor="studentname" className="col-form-label">
                    Subject name:
                  </label>
                  <input
                    type="text"
                    className="form-control selector"
                    id="studentname"
                    name="studentname"
                    value={points.subjectname}
                    disabled
                    required
                  />
                </div>
                <div className="form-group controlcontainer">
                  <label htmlFor="firstname" className="col-form-label">
                    Cat one marks:
                  </label>
                  <input
                    type="number"
                    step="any"
                    className="form-control selector"
                    id="catonemarks"
                    name="catonemarks"
                    onChange={this.handleCatOneEvent.bind(this)}
                    value={catOne!==null?catOne:points.catone}
                    required
                  />
                </div>
                <div className="form-group controlcontainer">
                  <label htmlFor="email" className="col-form-label">
                    Cat two marks:
                  </label>
                  <input
                    type="number"
                    step="any"
                    className="form-control"
                    id="cattwomarks"
                    name="cattwomarks"
                    onChange={this.handleCatTwoEvent.bind(this)}
                    value={catTwo!==null?catTwo:points.cattwo}
                    required
                  />
                </div>
                <div className="form-group controlcontainer">
                  <label htmlFor="phonenumber" className="col-form-label">
                    Exam marks:
                  </label>
                  <input
                    type="number"
                    step="any"
                    className="form-control"
                    id="exammarks"
                    name="exammarks"
                    onChange={this.handleExamEvent.bind(this)}
                    value={exam!==null?exam:points.exam}
                    required
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
                      label="Update marks"
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
              <Modal.Title>Marks updating</Modal.Title>
            </Modal.Header>
            <Modal.Body> Marks is updated successfully!</Modal.Body>
            <Modal.Footer>
              <CustomCancelButton
                type="button"
                className="btn-cancel"
                handleHide={this.handlePointRedirect.bind(this)}
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
const mapStateToProps = ({ updatePointReducer }) => {
  //console.log(updatePointReducer);
  return {
    pointsResponse: updatePointReducer,
  };
};

export default connect(mapStateToProps, {
  updatePointsAction,
})(UpdateMarksModal);
