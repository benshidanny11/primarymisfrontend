import React, { Component } from "react";
import {
  getClassesAction,
  createStudentAction,
} from "../../../../redux/action";
import { connect } from "react-redux";
import _ from "lodash";
import { Modal, Button as BtnModal } from "react-bootstrap";
import Progress from "./progressModal";
import { $ } from "react-jquery-plugin";
import { ToastContainer, toast } from "react-toastify";
import { handleCreateErrorToast } from "../../../../utils/showToastUtil";
class Addstudentmodal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levelid: 1,
      classes: [],
      showProgress: false,
      hideModal: false,
      showResponseModal: false,
    };
    // this.handleLevelChangeEvent.bind(this);
  }

  componentDidMount() {
    // if (this.props.allClasses) {
    //   this.setState({
    //     classes: this.props.allClasses,
    //   });
    // }
  }
  /*
    return {
        ...state,
        createdStudent:payload,
        type: "success-create",
      };
    case actionTypes.CREATE_STUDENT_ERROR_ACTION:
      return {
        ...state,
        payload,
        type: "error-create",
      };
    case actionTypes.CREATE_STUDENT_LOADING_ACTION:
      return {
        ...state,
       type:"loading-create",
      };
  */

  componentDidUpdate(prevProps, prevState, snapshot) {
   

    if (!_.isEqual(prevProps.allClasses, this.props.allClasses)) {
      this.setState({
        classes: this.props.allClasses,
      });
    }
    if (prevProps !== this.props) {
      if (this.props.createStudentResponse.type === "loading-create") {
        $("#dotprogress").removeClass("dotprogress");
        console.log("Response", this.props.createStudentResponse);
      } else if (this.props.createStudentResponse.type === "error-create") {
        $("#dotprogress").addClass("dotprogress");
        console.log(
          "Error",
          this.props.createStudentResponse.payload.data.message
        );
        handleCreateErrorToast(
          this.props.createStudentResponse.payload.data.message,
          toast
        );
      } else if (this.props.createStudentResponse.type === "success-create") {
        console.log("Response", this.props.createStudentResponse);
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
  handleStudentSubmit(e) {
    e.preventDefault();
    const studentData = {
      studentsNames: e.target.studentnames.value,
      parentsEmail: e.target.parentemail.value,
      parentsPhone: e.target.parentsphone.value,
      studentClass: e.target.studentclass.value,
      studentLevel: e.target.studentslevel.value,
    };

    this.props.createStudentAction(studentData);
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
    window.location.href = "/students";
  };

  handleRedirect = () => {
    window.location.href = "/students";
  };
  render() {
    const { classes, showProgress, hideModal, showResponseModal } = this.state;
    return (
      <div>
        {!showResponseModal ? (
          <Modal
            {...this.props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => hideModal}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Register new student
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Progress open={showProgress} />
              <form onSubmit={this.handleStudentSubmit.bind(this)}>
                <div className="form-group">
                  <label htmlFor="firstname" className="col-form-label">
                    Student names:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    name="studentnames"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="col-form-label">
                    Parent's email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="parentemail"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phonenumber" className="col-form-label">
                    Parent's phone:
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="parentsphone"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="recipient-name" className="col-form-label">
                    Student's level:
                  </label>
                  <select
                    required
                    className="form-control"
                    id="studentslevel"
                    name="studentslevel"
                    onChange={this.handleLevelChangeEvent.bind(this)}
                  >
                    <option value="">Choose a level</option>
                    <option value={1}>P one</option>
                    <option value={2}>P two</option>
                    <option value={3}>P three</option>
                    <option value={4}>P four</option>
                    <option value={5}>P five</option>
                    <option value={6}>P six</option>
                  </select>
                </div>
                <div className="form-group">
                  <label for="recipient-name" className="col-form-label">
                    Student's class:
                  </label>
                  <select
                    type="text"
                    className="form-control"
                    id="studentsclass"
                    name="studentclass"
                    required
                  >
                    <option value="">Choose a class</option>
                    {classes ? (
                      classes.map((classItem) => (
                        <option
                          value={classItem.classid}
                          key={classItem.classname}
                        >
                          {classItem.classname}
                        </option>
                      ))
                    ) : (
                      <option value="">No classes found</option>
                    )}
                  </select>
                </div>
                <Modal.Footer>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.props.onHide}
                  >
                    Cancel
                  </button>
                  <input
                    type="submit"
                    className="btn submit-student"
                    value="Register student"
                  />
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
              <Modal.Title>Student registration</Modal.Title>
            </Modal.Header>
            <Modal.Body> Student is registered successfully</Modal.Body>
            <Modal.Footer>
              <BtnModal
                variant="primary"
                onClick={this.handleRedirect.bind(this)}
              >
               Okay
              </BtnModal>
            </Modal.Footer>
          </Modal>
        )}

        <ToastContainer />
      </div>
    );
  }
}
const mapStateToProps = ({ studentReducer, createStudentReducer }) => {
  return {
    allClasses: studentReducer.classses,
    levelid: studentReducer.payload,
    createStudentResponse: createStudentReducer,
  };
};

export default connect(mapStateToProps, {
  getClassesAction,
  createStudentAction,
})(Addstudentmodal);
