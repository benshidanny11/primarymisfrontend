import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { $ } from "react-jquery-plugin";
import classNames from "classnames";
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
    backgroundColor: "#1168ca",
    color: "white",
    "&:hover": {
      background: "#2579da",
      color: "#fff",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    display:"flex",
    
  },
}));


export default function UpperUser({ handelLevelChange,handleYearChange, handleShowModal,handleDisableSearch }) {
  const classes = useStyles();
  const [level, setLevel] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setLevel(event.target.value);
    handleDisableSearch(false)
    handelLevelChange(event.target.value);
  };
  const handleYearChangeEvent=(e)=>{
    handleYearChange(e.target.value);
  }

  return (
    <div className="selectorContainer">
      <div className="selectorinner">
      </div>

      <Button
        variant="contained"
        startIcon={<Add />}
        className={classes.button}
        onClick={handleShowModal}
      >
        Add user
      </Button>
    </div>
  );
}
