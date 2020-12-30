import React, { Component } from "react";
import { createPointsAction } from "../../../../redux/action";
import { connect } from "react-redux";
import _ from "lodash";
import { Modal, Button as BtnModal } from "react-bootstrap";
import Progress from "./progressModal";
import { $ } from "react-jquery-plugin";
import { ToastContainer, toast } from "react-toastify";
import { handleCreateErrorToast } from "../../../../utils/showToastUtil";

import { CustomButton, CustomCancelButton } from "../styledcontrols/buttons";
import cookie from "react-cookies";

class AddMarksModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levelid: 1,
      classes: [],
      showProgress: false,
      hideModal: false,
      showResponseModal: false,
    };
  }
  // classes = useStyles();

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!_.isEqual(prevProps.allClasses, this.props.allClasses)) {
      this.setState({
        classes: this.props.allClasses,
      });
    }
    if (prevProps !== this.props) {
      if (this.props.pointsResponse.type === "loading-create-point") {
        $("#dotprogress").removeClass("dotprogress");
      } else if (this.props.pointsResponse.type === "error-create-point") {
        $("#dotprogress").addClass("dotprogress");
        handleCreateErrorToast(
          this.props.pointsResponse.data.message,
          toast,
          1500,
          this.handleRedirect
        );
      } else if (this.props.pointsResponse.type === "success-create-point") {
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
    const { marksData } = this.props;
    const { userid } = cookie.load("user");

    const pointsData = {
      subjectname: marksData.subjectName,
      catone: e.target.catonemarks.value,
      cattwo: e.target.cattwomarks.value,
      exam: e.target.exammarks.value,
      term: e.target.term.value,
      levelid: marksData.levelid,
      studentid: marksData.studentId,
      teacherid: userid,
    };
    this.props.createPointsAction(pointsData);
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
    const { classes, showProgress, hideModal, showResponseModal } = this.state;
    const { marksData } = this.props;
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
                Add subject marks
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
                    placeholder={marksData.studenName}
                    value={marksData.studenName}
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
                    value={marksData.subjectName}
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
                    className="form-control selector"
                    id="catonemarks"
                    name="catonemarks"
                    required
                  />
                </div>
                <div className="form-group controlcontainer">
                  <label htmlFor="email" className="col-form-label">
                    Cat two marks:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="cattwomarks"
                    name="cattwomarks"
                    required
                  />
                </div>
                <div className="form-group controlcontainer">
                  <label htmlFor="phonenumber" className="col-form-label">
                    Exam marks:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exammarks"
                    name="exammarks"
                    required
                  />
                </div>
                <div className="form-group controlcontainer">
                  <label for="recipient-name" className="col-form-label">
                    Term:
                  </label>
                  <select
                    required
                    className="form-control"
                    id="term"
                    name="term"
                  >
                    <option value="">Choose term</option>
                    <option value="1">Term one</option>
                    <option value="2">Term two</option>
                    <option value="3">Term three</option>
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
                      label="Add marks"
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
              <Modal.Title>Marks adding</Modal.Title>
            </Modal.Header>
            <Modal.Body> Marks is added successfully!</Modal.Body>
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
const mapStateToProps = ({ createPointReducer }) => {
  console.log(createPointReducer);
  return {
    pointsResponse: createPointReducer,
  };
};

export default connect(mapStateToProps, {
  createPointsAction,
})(AddMarksModal);
