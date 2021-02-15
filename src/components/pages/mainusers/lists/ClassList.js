import React, { useState, useEffect } from "react";
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
  Typography,
} from "@material-ui/core";
import ContentLoader from "react-content-loader";
import { Visibility, ArrowBack, ArrowForward } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import {ProgressFull} from "../modals/progressFullModal";

function ClassList({
  allClasses,
  displayNoDataFound,
}) {
console.log('in list'+allClasses)
  //Variables Declarations

  ///------------End of  states and variable declaration----

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

  const useStyles = makeStyles({
    table: {},
    container: {
      margin: 20,
      overflow: "auto",
      padding: 10,
    },
    progressContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 20,
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

  const classes = useStyles();
  //Event handlers

  return (
    <div>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Class name</StyledTableCell>
              <StyledTableCell align="">Class Teacher</StyledTableCell>
              <StyledTableCell align="">number of students</StyledTableCell>
              <StyledTableCell align="center">Options</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row"></StyledTableCell>
              <StyledTableCell align=""></StyledTableCell>
              <StyledTableCell align=""></StyledTableCell>
              <StyledTableCell align=""></StyledTableCell>
            </StyledTableRow>
            {displayNoDataFound ? (
              <Typography
                variant="h5"
                align="center"
                component="h5"
                gutterBottom
              >
                No class found
              </Typography>
            ) : allClasses.length !== 0 ? (
                allClasses.map((allClasses, key) =>
                  <StyledTableRow key={key}>
                    <StyledTableCell component="th" scope="row">
                      {allClasses.className}
                    </StyledTableCell>
                    <StyledTableCell align="">
                    {allClasses.className}
                    </StyledTableCell>
                    <StyledTableCell align="">
                    {allClasses.className}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {" "}
                      <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        className={classes.button}
                        startIcon={<Visibility />}
                      >
                        View more
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
              )
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
      <ProgressFull />
    </div>
  );
}
export default ClassList;
