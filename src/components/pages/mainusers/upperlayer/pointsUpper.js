import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { $ } from "react-jquery-plugin";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  button: {
    height: 35,
    backgroundColor: "#1168ca",
    fontSize:10,
    color: "white",
    "&:hover": {
      background: "#2579da",
      color: "#fff",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


export default function PointsLevelList({ handelLevelChange, handleBack}) {
  const classes = useStyles();
  const [age, setAge] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
    handelLevelChange(event.target.value);
  };

  return (
    <div className="selectorContainer">
      <FormControl className={classes.formControl}>
        <select
          value={age}
          onChange={handleChange}
          id="selector"
          className=" form-control"
        >
          <option value={'1'}>term one</option>
          <option value={'2'}>term two</option>
          <option value={'2'}>term three</option>
        </select>
      </FormControl>
      <Button
        variant="contained"
        startIcon={<ArrowBack />}
        className={classes.button}
        onClick={handleBack}
      >
        Back to subjects
      </Button>
    </div>
  );
}