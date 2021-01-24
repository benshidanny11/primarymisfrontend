import React, { Component } from "react";
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
import { createUserAction} from "../../../../redux/action";

class AddUserModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProgress: false,
      hideModal: false,
      showResponseModal: false,
    };
  }
  
  componentWillReceiveProps({createUSerResponse}){
      console.log("Type: ",createUSerResponse.type);
    if (createUSerResponse.type === "loading") {
       this.setState({
           showProgress:true
       })
       $("#dotprogress").removeClass("dotprogress");
      } else if (createUSerResponse.type === "error") {
        this.setState({
            showProgress:false
        })
        $("#dotprogress").addClass("dotprogress");
        if (!createUSerResponse.data) {
          handleCreateErrorToast(createUSerResponse.data.error.message[0],toast,3000,()=>{window.location.href="/users";});
        } else if (createUSerResponse.data.error) {
        
            handleCreateErrorToast(createUSerResponse.data.error,toast,3000,()=>{window.location.href="/users";});
        
        } else if (createUSerResponse.data.Error) {
          
          handleCreateErrorToast(createUSerResponse.data.Error,toast,3000,()=>{window.location.href="/users";});
    
        } else {
            handleCreateErrorToast(createUSerResponse.message,toast,3000,()=>{window.location.href="/users";});
        }
      }
      if (createUSerResponse.type === "success") {
        this.setState({
            showProgress:false
        });
        this.setState({
            showResponseModal:true
        })
      }
  }
  onFormSubmit(e) {
    e.preventDefault();
    const userData = {
      firstName: e.target.firstname.value,
      lastName: e.target.lastname.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      role: e.target.role.value,
      password: e.target.password.value,
    };
    this.props.createUserAction(userData);
  }
  handleHideModal(){
      window.location.href="/users"
  }

  render() {
    const { showResponseModal, showProgress } = this.state;
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
                Register new user
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalb">
              <Progress open={showProgress} />

              <form onSubmit={this.onFormSubmit.bind(this)}>
                <div className="form-group controlcontainer">
                  <label htmlFor="firstname" className="col-form-label">
                    First name:
                  </label>
                  <input
                    type="text"
                    className="form-control selector"
                    id="firstname"
                    name="firstname"
                    required
                  />
                </div>
                <div className="form-group controlcontainer">
                  <label htmlFor="firstname" className="col-form-label">
                    Last name:
                  </label>
                  <input
                    type="text"
                    className="form-control selector"
                    id="lastname"
                    name="lastname"
                    required
                  />
                </div>
                <div className="form-group controlcontainer">
                  <label htmlFor="email" className="col-form-label">
                    Parent's email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    required
                  />
                </div>
                <div className="form-group controlcontainer">
                  <label htmlFor="phonenumber" className="col-form-label">
                    Parent's phone:
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    required
                  />
                </div>
                <div className="form-group controlcontainer">
                  <label for="recipient-name" className="col-form-label">
                    User role:
                  </label>
                  <select
                    required
                    className="form-control"
                    id="studentslevel"
                    name="role"
                    // onChange={this.handleLevelChangeEvent.bind(this)}
                  >
                    <option value="">Choose user role</option>
                    <option value="TEACHER">Teacher</option>
                    <option value="DOS">Director of studies</option>
                  </select>
                </div>
                <div className="form-group controlcontainer">
                  <label htmlFor="phonenumber" className="col-form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
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
                      label="Add user"
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
              <Modal.Title>User registration</Modal.Title>
            </Modal.Header>
            <Modal.Body> User is registered successfully</Modal.Body>
            <Modal.Footer>
              <CustomCancelButton
                type="button"
                className="btn-cancel"
                handleHide={this.handleHideModal.bind(this)}
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
const mapStateToProps = ({ createUserReducer }) => {
    return {
      createUSerResponse: createUserReducer,
    };
  };
  
  export default connect(mapStateToProps, {
    createUserAction,
  })(AddUserModal);
