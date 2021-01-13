import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  Dialog,
  Divider,
  Icon,
} from "@material-ui/core";
import classNames from "classnames";

const useStyles = makeStyles({
  avatar: {
    color: "#1168ca",
  },
});

export default function YearChooserMenu({
  onChooseYear,
  open,
}) {
  const classes = useStyles(); 
  const academicYears=["2020-2021","2021-2022","2022-2023","2023-2024","2024-2025","2025-2026","2026-2027","2027-2028","2028-2029","2029-2028"]
  const handleClose = () => {
    //onClose(selectedValue);
  };
  const handleChooseYear = (year) => {
    onChooseYear(year);
  };
  return (
    <div>
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Choose academic year</DialogTitle>
      <Divider />
      <List>
        {academicYears.map((year) => (
          <ListItem
            autoFocus
            button
            onClick={() => handleChooseYear(year)}
            key={year}
          >
            {" "}
            <ListItemAvatar>
              <Icon className={classNames(classes.avatar,"fas fa-user-graduate")}/>
            </ListItemAvatar>
            <ListItemText primary={year} />
          </ListItem>
        ))}
      </List>
    </Dialog>
    
    </div>
  );
}
