import React, { Component } from "react";
import {
  updateStudentAction,
  getClassesAction,
} from "../../../../redux/action";
import { connect } from "react-redux";
import _ from "lodash";
import { Modal, Button as BtnModal } from "react-bootstrap";
import Progress from "./progressModal";
import { $ } from "react-jquery-plugin";
import { ToastContainer, toast } from "react-toastify";
import { handleCreateErrorToast } from "../../../../utils/showToastUtil";
class Updatestudentmodal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levelid: 1,
      classes: [],
      showProgress: false,
      hideModal: false,
      showResponseModal: false,
      stundentNames: null,
      parentsemail: null,
      parentsphonenumber: null,
    };

    this.handleEvent = this.handleEvent.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {
    this.setState({
      stundentNames: null,
      parentsemail: null,
      parentsphonenumber: null,
    });
  }

  // Prototype methods, Bind in Constructor (ES2015)
  handleEvent() {}

  handleNamesChange = (e) => {
    this.setState({
      stundentNames: e.target.value,
    });
  };

  handleEmailChange = (e) => {
    console.log(e.target.value);
    this.setState({
      parentsemail: e.target.value,
    });
  };
  handlePhoneChange = (e) => {
    this.setState({
      parentsphonenumber: e.target.value,
    });
  };

  handleLevelChangeEvent(e) {
    this.props.getClassesAction(e.target.value);
  }

  //On update action
  handleStudentSubmit(e) {
    e.preventDefault();

    const studentData = {
      id: this.props.student.studentid,
      studentsNames: e.target.studentnames.value,
      parentsEmail: e.target.parentemail.value,
      parentsPhone: e.target.parentsphone.value,
      studentClass: e.target.studentclass.value,
      studentLevel: e.target.studentslevel.value,
    };

    this.props.updateStudentAction(studentData);

    this.setState({
      hideModal: true,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.props.updateStudentResponse.type);
    if (!_.isEqual(prevProps.allClasses, this.props.allClasses)) {
      this.setState({
        classes: this.props.allClasses,
      });
    }
    if (prevProps !== this.props) {
      if (this.props.updateStudentResponse.type === "loading-update") {
        $("#dotprogress").removeClass("dotprogress");
        console.log("Loading");
      } else if (this.props.updateStudentResponse.type === "error-update") {
        $("#dotprogress").addClass("dotprogress");
        console.log("On error", this.props.updateStudentResponse);
        handleCreateErrorToast(
          this.props.updateStudentResponse.payload.data.message,
          toast
        );
      } else if (this.props.updateStudentResponse.type === "success-update") {
        console.log("On success Response", this.props.updateStudentResponse);
        this.setState({
          showResponseModal: true,
        });
        $("#dotprogress").addClass("dotprogress");
      }
    }
  }
  componentWillMount() {}

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
    const {
      classes,
      showProgress,
      hideModal,
      showResponseModal,
      stundentNames,
      parentsemail,
      parentsphonenumber,
    } = this.state;
    const { student } = this.props;

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
                Update student student
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
                    value={
                      stundentNames === null
                        ? student.studentnames
                        : stundentNames
                    }
                    onChange={this.handleNamesChange.bind(this)}
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
                    value={
                      parentsemail === null
                        ? student.parentsemail
                        : parentsemail
                    }
                    onChange={this.handleEmailChange.bind(this)}
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
                    value={
                      parentsphonenumber === null
                        ? student.parentsphonenumber
                        : parentsphonenumber
                    }
                    onChange={this.handlePhoneChange.bind(this)}
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
                    <option value={student.levelid}>{student.levelname}</option>
                    <option value={1}>P 1</option>
                    <option value={2}>P 2</option>
                    <option value={3}>P 3</option>
                    <option value={4}>P 4</option>
                    <option value={5}>P 5</option>
                    <option value={6}>P 6</option>
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
                    onClick={this.handleRedirect.bind(this)}
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
              <Modal.Title>Update student</Modal.Title>
            </Modal.Header>
            <Modal.Body> Student is upated successfully!</Modal.Body>
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
const mapStateToProps = ({ studentReducer, updateStudentReducer }) => {
  return {
    allClasses: studentReducer.classses,
    levelid: studentReducer.payload,
    updateStudentResponse: updateStudentReducer,
  };
};

export default connect(mapStateToProps, {
  getClassesAction,
  updateStudentAction,
})(Updatestudentmodal);
