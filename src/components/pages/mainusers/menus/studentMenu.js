import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  Dialog,
  Typography,
  Divider,
  Icon,
} from "@material-ui/core";

import { blue } from "@material-ui/core/colors";
import classNames from "classnames";

const useStyles = makeStyles({
  avatar: {
    color: "#1168ca",
  },
});

export default function StudentMenu({
  onClose,
  selectedValue,
  open,
  student,
  options,
  handleOnDismis
}) {
  const classes = useStyles(); 
 
  const handleClose = () => {
    //onClose(selectedValue);
  };
  const handleUpdateStudentModal = (option) => {
    onClose({student,option});
  };
  return (
    <div>
    <Dialog
      onClose={handleOnDismis}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{student.studentnames}</DialogTitle>
      <Divider />
      <List>
        {options.map((option) => (
          <ListItem
            autoFocus
            button
            onClick={() => handleUpdateStudentModal(option[0])}
            key={option[0]}
          >
            {" "}
            <ListItemAvatar>
              <Icon className={classNames(classes.avatar,option[1])} />
            </ListItemAvatar>
            <ListItemText primary={option[0]} />
          </ListItem>
        ))}
      </List>
    </Dialog>
    
    </div>
  );
}
