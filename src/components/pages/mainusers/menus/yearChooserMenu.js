import React,{useState} from "react";
import { makeStyles,withStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  Dialog,
  Divider,
  Icon,
  TextField,
  Button
} from "@material-ui/core";
import {
  Search
} from "@material-ui/icons";
import Autocomplete from '@material-ui/lab/Autocomplete';
import classNames from "classnames";
import {handleCreateErrorToast} from "../../../../utils/showToastUtil"
import { ToastContainer, toast } from "react-toastify";

const useStyles = makeStyles({
  avatar: {
    color: "#1168ca",
  },
  selector:{
    marginTop:10,
    marginRight:20,
    marginLeft:20,
    marginBottom:20,
    width:400,
    border:2,
    '&$focused $notchedOutline': {
      border: '1px solid #4A90E2'
    },
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  }
});


const StyledAutoComplete = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'rgb(80, 80, 80)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#1168ca',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#1168ca',
      },
      '&:hover fieldset': {
        borderColor: '#1168ca',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1168ca',
      },
    },
    margin:20
  },
})(Autocomplete);


export default function YearChooserMenu({
  onChooseYear,
  open,
  handleOnClose
}) {
  const classes = useStyles(); 
  const academicYears=["2020-2021","2021-2022","2022-2023","2023-2024","2024-2025","2025-2026","2026-2027","2027-2028","2028-2029","2029-2030","2030-2031"]
  const handleClose = () => {
   // handleOnClose()
    //onClose(selectedValue);
  };
  const handleChooseYear = (e) => {
       
    if (e.keyCode === 13) {
      e.preventDefault();
     
      if(e.target.value.length===0){
        handleCreateErrorToast("Please choose academic year",toast,1000)
       }else{
        onChooseYear(e.target.value);
       }
     } 

  };
  return (
    <div>
    <Dialog
      onClose={handleOnClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Choose academic year</DialogTitle>
      <Divider />

     <div className="yearchoosercontainer">
     <StyledAutoComplete
      id="country-select-demo"
      options={academicYears}
      className={classes.selector}
      getOptionLabel={(option) => option}
      renderOption={(option) => (
        <React.Fragment>
        
          {option.label}{option}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          onKeyUp={handleChooseYear}
          {...params}
          label="Choose a year and pres enter"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
     
     </div>
    </Dialog>
    <ToastContainer />
    </div>
  );
}
