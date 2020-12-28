import React from "react";
import _ from "lodash";
import { Modal } from "react-bootstrap";

import { makeStyles } from "@material-ui/core/styles";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Icon,
} from "@material-ui/core";
import classNames from "classnames";

export function Studentlistmodal(props) {
  const { students, subjectName,showLoading ,handleMarksData} = props;
  const useStyles = makeStyles({
    avatar: {
      color: "#1168ca",
    },
  });
  const classes = useStyles();
  const handleChooseSudent=(student)=>{
    handleMarksData(student,subjectName)
  }
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
        (!showLoading)?(<List>
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
          </List>):("Loading...")
        }
      
      </Modal.Body>
    </Modal>
  );
}
