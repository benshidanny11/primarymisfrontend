import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button as BtnModal } from "react-bootstrap";
import { deleteUserAction } from "../../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Progress from "./progressModal";
import { $ } from "react-jquery-plugin";
import { ToastContainer, toast } from "react-toastify";
import { handleCreateErrorToast } from "../../../../utils/showToastUtil";
import { CustomButton, CustomCancelButton } from "../styledcontrols/buttons";

function DeleteUser(props) {
  const dispatch = useDispatch();
  const [displayDeletedResponse, setDisplayDeleteResponse] = useState(false);
  const [hideWarningMessage, setHideWarningMessage] = useState(false);
  const handleDelete = async(e) => {
    const { userid } = props;
    dispatch(await deleteUserAction(userid));
  };
  const handleRedirect = () => {
    window.location.href = "/users";
  };
  const stateData = useSelector((state) => state);
  useEffect(() => {
      console.log("Detete action type",stateData.deleteUSerReducer.type)
    if (stateData.deleteUSerReducer.type=== "loading-delete-user") {
      $("#dotprogress").removeClass("dotprogress");
      setHideWarningMessage(true);
    } else if (stateData.deleteUSerReducer.type === "error-delete-user") {
        console.log("Response error=====>",stateData.deleteUSerReducer)
      $("#dotprogress").addClass("dotprogress");
      handleCreateErrorToast("Unknown error", toast);
    } else if (stateData.deleteUSerReducer.type === "success-delete-user") {
      $("#dotprogress").addClass("dotprogress");
      setDisplayDeleteResponse(true);
    }
  }, [stateData.deleteUSerReducer.type]);

  return !displayDeletedResponse ? (
    <Modal show={props.showDeleteWarning} onHide={props.handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete user</Modal.Title>
      </Modal.Header>
      <Progress />
      <Modal.Body>
        {!hideWarningMessage ? (
          <p>Are you sure you want to delete user {props.name} ? </p>
        ) : (
          ""
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="btn-container">
          <CustomCancelButton
            type="button"
            className="btn-cancel"
            handleHide={props.handleHideModal}
            label="No"
          />

          <CustomCancelButton
            type="button"
            label="Yes"
            handleHide={handleDelete}
            className="btn-submit"
          />
        </div>
      </Modal.Footer>
    </Modal>
  ) : (
    <Modal show={true} onHide={props.handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete user</Modal.Title>
      </Modal.Header>
      <Progress />
      <Modal.Body>
        <p>User was deleted successfully!</p>
      </Modal.Body>
      <Modal.Footer>
        <CustomCancelButton
            type="button"
            className="btn-cancel"
            handleHide={handleRedirect}
            label="Go back"
          />
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteUser;
