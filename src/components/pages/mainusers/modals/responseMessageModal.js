import React from 'react'
import { Modal, Button as BtnModal } from "react-bootstrap";
import { CustomCancelButton } from '../styledcontrols/buttons';

function ResponseMessageModal({title,message,showResponseModal,onBackClick}) {
    return (
        <Modal
        show={showResponseModal}
        onHide={onBackClick}
        >
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message} </Modal.Body>
          <Modal.Footer>
            <CustomCancelButton
              type="button"
              className="btn-cancel"
              handleHide={onBackClick}
              label="Back"
            />
          </Modal.Footer>
        </Modal>
    )
}

export default ResponseMessageModal
