import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { CustomClickableButton, CustomCancelButton } from "../styledcontrols/buttons";

function ReportDataChooserModal(props) {
  //States
  const [chosenReportType, setChosenReportType] = useState("");
  const [chosenReportYear, setChosenReportYear] = useState("2020-2021");
  const [choosenReporTerm, setChosenReportTerm] = useState("1");

  const handleChooseReportType = (e) => {
      setChosenReportType(e.target.value);
      setChosenReportYear("2020-2021")
      setChosenReportTerm("1");
  };
  const handleChooseReportTerm = (e) => {
    setChosenReportTerm(e.target.value);
};
const handleChooseReportYear = (e) => {
    setChosenReportYear(e.target.value);
};
const handleContinueEvent=()=>{
    if(chosenReportType==="term"){
        alert("Choosen ReportType: "+chosenReportType+"\nChoosen term: "+choosenReporTerm);
    }else if(chosenReportType==="year"){
        alert("Choosen ReportType: "+chosenReportType+"\nChoosen term: "+choosenReporTerm+"\nChoosen academic year: "+chosenReportYear);
    }else{
        alert("No report type choosen");
    }
}
  return (
    <div>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton={true}>
          <Modal.Title id="contained-modal-title-vcenter">
            Report data options
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">
              Report type:
            </label>
            <select
              required
              className="form-control"
              id="subjectlevel"
              name="subjectlevel"
              onChange={handleChooseReportType}
            >
              <option value="">Choose report type</option>
              <option value="term">Term report</option>
              <option value="year">Anual report</option>
            </select>
          </div>
          {chosenReportType==="term"?  <div className="form-group">
            <label htmlFor="subjectteacher" className="col-form-label">
              Choose term:
            </label>
            <select id="selector" className=" form-control" onChange={handleChooseReportTerm}>
              <option value="1">term one</option>
              <option value="2">term two</option>
              <option value="3">term three</option>
            </select>
          </div>:chosenReportType==="year"?<div> <div className="form-group">
            <label htmlFor="subjectteacher" className="col-form-label">
              Choose term:
            </label>
            <select id="selector" className=" form-control"  onChange={handleChooseReportTerm}>
              <option value="1">term one</option>
              <option value="2">term two</option>
              <option value="3">term three</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="subjectteacher" className="col-form-label">
              Choose academic:
            </label>
            <select required className="form-control" id="year" name="year" onChange={handleChooseReportYear}>
              <option value="2020-2021">2020-2021</option>
              <option value="2021-2022">2021-2022</option>
              <option value="2022-2023">2022-2023</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2026-2027">2026-2027</option>
              <option value="2027-2028">2027-2028</option>
              <option value="2028-2029">2028-2029</option>
              <option value="2029-2023">2029-2030</option>
            </select>
          </div></div>:""}
         
          <Modal.Footer id="footer">
            <div className="btn-container">
              <CustomCancelButton
                type="button"
                className="btn-cancel"
                label="Cancel"
                handleHide={props.handleHideModal}
              />

              <CustomClickableButton
                type="submit"
                label="Continue"
                className="btn-submit"
                handleClickEvent={handleContinueEvent}
              />
            </div>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ReportDataChooserModal;
