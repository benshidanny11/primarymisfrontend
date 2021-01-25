import React, { Component } from "react";
import { updateUserAction } from "../../../../redux/action";
import { connect } from "react-redux";
import _ from "lodash";
import { Modal, Button as BtnModal } from "react-bootstrap";
import Progress from "./progressModal";
import { $ } from "react-jquery-plugin";
import { ToastContainer, toast } from "react-toastify";
import { handleCreateErrorToast } from "../../../../utils/showToastUtil";
import { CustomButton, CustomCancelButton } from "../styledcontrols/buttons";
class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levelid: 1,
      classes: [],
      showProgress: false,
      hideModal: false,
      showResponseModal: false,
      names: null,
      email: null,
      phonenumber: null,
      role: null,
    };

    this.handleEvent = this.handleEvent.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {
    this.setState({
      names: null,
      email: null,
      phonenumber: null,
    });
  }

  // Prototype methods, Bind in Constructor (ES2015)
  handleEvent() {}

  handleNamesChange = (e) => {
    this.setState({
      names: e.target.value,
    });
  };

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePhoneChange = (e) => {
    this.setState({
      phonenumber: e.target.value,
    });
  };


  //On update action
  handleUserSubmit(e) {
    e.preventDefault();

    this.props.updateUserAction(
      this.props.user.userid,
      e.target.names.value,
      e.target.email.value,
      e.target.phonenumber.value,
      e.target.role.value
    );

    this.setState({
      hideModal: true,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
     console.log("Update user =====>",this.props.updateUserResponse.type)
    if (prevProps !== this.props) {
      if (this.props.updateUserResponse.type === "loading-update-user") {
        $("#dotprogress").removeClass("dotprogress");
        console.log("Loading");
      } else if (this.props.updateUserResponse.type === "error-update-user") {
        $("#dotprogress").addClass("dotprogress");
        handleCreateErrorToast(
          this.props.updateUserResponse.payload.data.message,
          toast
        );
      } else if (this.props.updateUserResponse.type === "success-update-user") {
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
    window.location.href = "/users";
  };

  handleRedirect = () => {
    window.location.href = "/users";
  };

  handleNamesChange(e) {
    this.setState({
      names: e.target.value,
    });
  }
  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }
  handlePhoneChange(e) {
    this.setState({
      phone: e.target.value,
    });
  }
  render() {
    const {
      showProgress,
      hideModal,
      showResponseModal,
      names,
      email,
      phonenumber,
    } = this.state;
    const { user } = this.props;
    console.log("User===>",user);

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
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Update user
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Progress open={showProgress} />
              <form onSubmit={this.handleUserSubmit.bind(this)}>
                <div className="form-group controlcontainer">
                  <label htmlFor="firstname" className="col-form-label">
                    User full name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="names"
                    name="names"
                    required
                    value={names === null ? user.names : names}
                    onChange={this.handleNamesChange.bind(this)}
                  />
                </div>
                <div className="form-group controlcontainer">
                  <label htmlFor="email" className="col-form-label">
                    User email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    required
                    value={email === null ? user.email : email}
                    onChange={this.handleEmailChange.bind(this)}
                  />
                </div>
                <div className="form-group controlcontainer">
                  <label htmlFor="phonenumber" className="col-form-label">
                    User phone:
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phonenumber"
                    required
                    value={
                      phonenumber === null ? user.phonenumber : phonenumber
                    }
                    onChange={this.handlePhoneChange.bind(this)}
                  />
                </div>
                <div className="form-group controlcontainer">
                  <label for="recipient-name" className="col-form-label">
                    User role:
                  </label>
                  <select
                    required
                    className="form-control"
                    id="role"
                    name="role"
                  >
                     <option value={user.role}>{user.role}</option>
                    <option value="TEACHER">Teacher</option>
                    <option value="DOS">Director of study</option>
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
                      label="Update user"
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
              <Modal.Title>Update user</Modal.Title>
            </Modal.Header>
            <Modal.Body> User is upated successfully!</Modal.Body>
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
const mapStateToProps = ({ updateUserReducer }) => {
  return {
    updateUserResponse: updateUserReducer,
  };
};

export default connect(mapStateToProps, {
  updateUserAction,
})(UpdateUser);
