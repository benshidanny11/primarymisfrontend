import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button as BtnModal } from "react-bootstrap";
import { deleteStudentAction } from "../../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Progress from "./progressModal";
import { $ } from "react-jquery-plugin";
import { ToastContainer, toast } from "react-toastify";
import { handleCreateErrorToast } from "../../../../utils/showToastUtil";
import { CustomButton, CustomCancelButton } from "../styledcontrols/buttons";

function Deletestudentmodal(props) {
  const dispatch = useDispatch();
  const [displayDeletedResponse, setDisplayDeleteResponse] = useState(false);
  const [hideWarningMessage, setHideWarningMessage] = useState(false);
  const handleDelete = (e) => {
    const { id } = props;
    dispatch(deleteStudentAction(id));
  };
  const handleRedirect = () => {
    window.location.href = "/students";
  };
  const stateData = useSelector((state) => state);
  useEffect(() => {
    if (stateData.deleteStudentReducer.type === "loading-delete") {
      $("#dotprogress").removeClass("dotprogress");
      setHideWarningMessage(true);
    } else if (stateData.deleteStudentReducer.type === "error-delete") {
      console.log(stateData.deleteStudentReducer);
      $("#dotprogress").addClass("dotprogress");
      handleCreateErrorToast("Unknown error", toast);
    } else if (stateData.deleteStudentReducer.type === "success-delete") {
      console.log(stateData.deleteStudentReducer);
      $("#dotprogress").addClass("dotprogress");
      setDisplayDeleteResponse(true);
    }
  }, [stateData.deleteStudentReducer.type]);

  return !displayDeletedResponse ? (
    <Modal show={props.showDeleteWarning} onHide={props.handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delet student</Modal.Title>
      </Modal.Header>
      <Progress />
      <Modal.Body>
        {!hideWarningMessage ? (
          <p>Are you sure you want to delete this student?</p>
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
        <Modal.Title>Delete student</Modal.Title>
      </Modal.Header>
      <Progress />
      <Modal.Body>
        <p>Deleted successfully!</p>
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

Deletestudentmodal.propTypes = {};

export default Deletestudentmodal;
