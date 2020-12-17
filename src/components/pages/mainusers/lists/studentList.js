import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import ContentLoader from "react-content-loader";
import { Visibility } from "@material-ui/icons";


import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import StudentMenu from "../menus/studentMenu";

function Userslist({ students }) {
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#1168ca",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);


  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const useStyles = makeStyles({
    table: {},
    container: {
      width: 1100,
      margin: 20,
      overflow: "auto",
    },
    progressContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 20,
    },
    submit: {
      backgroundColor: "#F55128",
      borderRadius: 5,
      color: "#fff",
    },

    button: {
      height: 35,
      backgroundColor: "#1168ca",
      color: "white",
      "&:hover": {
        background: "#2579da",
        color: "#fff",
      },
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Full name</StyledTableCell>
            <StyledTableCell align="">Parents email</StyledTableCell>
            <StyledTableCell align="">Parents number</StyledTableCell>
            <StyledTableCell align="">Student class</StyledTableCell>
            <StyledTableCell align="center">Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.length !== 0 ? (
            students.map((student, key) => (
              <StyledTableRow key={key}>
                <StyledTableCell component="th" scope="row">
                  {student.studentnames}
                </StyledTableCell>
                <StyledTableCell align="">
                  {student.parentsemail}
                </StyledTableCell>
                <StyledTableCell align="">
                  {student.parentsphonenumber}
                </StyledTableCell>
                <StyledTableCell align="">{student.classname}</StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  <Button
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<Visibility />}
                    onClick={handleClickOpen}
                  >
                    View more
                  </Button>
                  <StudentMenu selectedValue={selectedValue} open={open} onClose={handleClose} student={student.studentnames}/>
                    
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow className={classes.progressContainer}>
              <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
              </ContentLoader>
              <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
              </ContentLoader>
              <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
              </ContentLoader>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Userslist;
