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
import { Edit } from "@material-ui/icons";

import { Typography } from "@material-ui/core";

import StudentMenu from "../menus/studentMenu";

import cookie from "react-cookies";

import UpdateMarksModal from "../modals/updatePointsModal";

function PointList({ points, displayNoDataFound }) {
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
  const [selectedStudent, setSelectedStudent] = React.useState({});
  const [options, setOptions] = React.useState([]);
  const [showUpdatePointsModal, setShowUpdatePointsModal] = React.useState(
    false
  );
  const [pointsToUpdate, setPointsToUpdate] = React.useState({});
  const [showDeleteStudentModal, setShowDeleteStudentModal] = React.useState(
    false
  );
  const role = cookie.load("user").role;

  const useStyles = makeStyles({
    table: {},
    container: {
      width: 1000,
      margin:"auto",
      overflow: "auto",
      padding: 10,
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
  const handleClickOpen = (point) => {
    // console.log(student)'
    setPointsToUpdate(point);
    setShowUpdatePointsModal(true);

  };


  const classes = useStyles();

  return (
    <div className="main-container">
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Student names</StyledTableCell>
              <StyledTableCell align="" width="1px">Class</StyledTableCell>
              <StyledTableCell align="" width="1px">CatOne</StyledTableCell>
              <StyledTableCell align="" width="1px">CatTwo</StyledTableCell>
              <StyledTableCell align="" width="1px">Exam </StyledTableCell>
              <StyledTableCell align="center">Options</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayNoDataFound ? (
              <Typography
                variant="h5"
                align="center"
                component="h5"
                gutterBottom
              >
                No marks found!
              </Typography>
            ) : points.length !== 0 ? (
              points.map((point, key) => (
                <StyledTableRow key={key}>
                  <StyledTableCell component="th" scope="row">
                    {point.studentnames}
                  </StyledTableCell>
                  <StyledTableCell align="">{point.levelname}</StyledTableCell>
                  <StyledTableCell align="">{point.catone}</StyledTableCell>
                  <StyledTableCell align="">{point.cattwo}</StyledTableCell>
                  <StyledTableCell align="">{point.exam}</StyledTableCell>
                  <StyledTableCell align="center">
                    {role === "TEACHER" ? (
                      <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<Edit />}
                        onClick={() => handleClickOpen(point)}
                      >
                        Updata marks
                      </Button>
                    ) : (
                      "No option"
                    )}
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
      <UpdateMarksModal
        show={showUpdatePointsModal}
        onHide={() => setShowUpdatePointsModal(false)}
        points={pointsToUpdate}
      />
    </div>
  );
}
export default PointList;
