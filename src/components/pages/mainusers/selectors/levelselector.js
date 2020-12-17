import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  button: {
    height: 35,
    backgroundColor:"#1168ca",
    color:"white",
    '&:hover': {
      background: "#2579da",
      color: "#fff",
   }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
 
  selector: {
    //width:120
  },
}));

export default function LevelList({ handelLevelChange }) {
  const classes = useStyles();
  const [age, setAge] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
    handelLevelChange(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="selectorContainer">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
          select level
        </InputLabel>
        <Select
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
          className={classes.selector}
        >
          <MenuItem value={1}>P one</MenuItem>
          <MenuItem value={2}>P two</MenuItem>
          <MenuItem value={3}>P three</MenuItem>
          <MenuItem value={4}>P four</MenuItem>
          <MenuItem value={5}>P five</MenuItem>
          <MenuItem value={6}>P six</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        startIcon={<Add />}
        className={classes.button}
      >
        Add student
      </Button>
    </div>
  );
}
