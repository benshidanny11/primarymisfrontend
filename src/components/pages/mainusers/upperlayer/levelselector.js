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


export default function LevelList({ handelLevelChange,handleYearChange, handleShowModal }) {
  const classes = useStyles();
  const [level, setLevel] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setLevel(event.target.value);
    handelLevelChange(event.target.value);
  };
  const handleYearChangeEvent=(e)=>{
    handleYearChange(e.target.value);
  }

  return (
    <div className="selectorContainer">
      <div className="selectorinner">
        <select
          value={level}
          onChange={handleChange}
          id="selector"
          className=" form-control"
        >
          <option value={1}>P one</option>
          <option value={2}>P two</option>
          <option value={3}>P three</option>
          <option value={4}>P four</option>
          <option value={5}>P five</option>
          <option value={6}>P six</option>
        </select>
        <select
          required
          className="form-control"
          id="year"
          name="year"
          onChange={handleYearChangeEvent}
        >
       
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
      </div>

      <Button
        variant="contained"
        startIcon={<Add />}
        className={classes.button}
        onClick={handleShowModal}
      >
        Add student
      </Button>
    </div>
  );
}
