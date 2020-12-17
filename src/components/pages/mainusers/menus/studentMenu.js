import React from "react";
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
} from "@material-ui/core";

import { Edit, Delete, Report } from "@material-ui/icons";

import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    color: blue,
  },
});

export default function StudentMenu(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{props.student}</DialogTitle>
      <List>
        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("addAccount")}
        >
          {" "}
          <ListItemAvatar>
            <Report className={classes.avatar} />
          </ListItemAvatar>
          <ListItemText primary="View student report" />
        </ListItem>
        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("addAccount")}
        >
          {" "}
          <ListItemAvatar>
            <Edit className={classes.avatar} />
          </ListItemAvatar>
          <ListItemText primary="Update student" />
        </ListItem>
        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("addAccount")}
        >
          {" "}
          <ListItemAvatar>
            <Delete className={classes.avatar} />
          </ListItemAvatar>
          <ListItemText primary="Delete student" />
        </ListItem>
      </List>
    </Dialog>
  );
}
