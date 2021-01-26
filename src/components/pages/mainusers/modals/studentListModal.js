import React from "react";
import _ from "lodash";
import { Modal } from "react-bootstrap";

import { makeStyles } from "@material-ui/core/styles";
import SearchBox from "../filterers/searchBox";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Icon,
} from "@material-ui/core";
import classNames from "classnames";

export function Studentlistmodal(props) {
  const {
    students,
    subjectName,
    showLoading,
    handleMarksData,
    handleSearchStudent,
    displayNoStudentFound
  } = props;
  const useStyles = makeStyles({
    avatar: {
      color: "#1168ca",
    },
  });
  const classes = useStyles();
  const handleChooseSudent = (student) => {
    handleMarksData(student, subjectName);
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton={true}>
        <Modal.Title id="contained-modal-title-vcenter">
          Choose student
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
        !displayNoStudentFound?        
        
        !showLoading ? (
          <List>
            <ListItem divider alignItems="right">
            <div className="divsearchcontainer"><SearchBox handleSearchQuery={handleSearchStudent} placeholder="Type student name/ Reg number"/></div>
            </ListItem>
            {students.map((student) => (
              <ListItem
                autoFocus
                button
                divider
                onClick={() => handleChooseSudent(student)}
                key={student.studentid}
              >
                {" "}
                <ListItemAvatar>
                  <Icon
                    className={classNames(
                      classes.avatar,
                      "fas fa-user-graduate"
                    )}
                  />
                </ListItemAvatar>
                <ListItemText primary={student.studentnames} />
              </ListItem>
            ))}
          </List>
        ) : (
          "Loading..."
        ): (
          "No student found"
        )}
      </Modal.Body>
    </Modal>
  );
}
