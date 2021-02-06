import React,{useEffect,useState} from "react";
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
import { Edit, ArrowBack, ArrowForward } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";

import { Typography } from "@material-ui/core";

import StudentMenu from "../menus/studentMenu";

import cookie from "react-cookies";
import SearchBox from "../filterers/searchBox";
import UpdateMarksModal from "../modals/updatePointsModal";
import {ProgressFullPoints} from "../modals/progressFullModal";
import {
  handleMarksNextPageChange,
  handleMarksPreviousPageChange,
  getAllPointsAction,
  getPaginationPointsAction
} from "../../../../redux/action";

function PointList({
  points,
  displayNoDataFound,
  handleSearchByStudent,
  showBackToPoints,
  pointsData,
}) {
  //Destructuring props data
  const { levelid, subjectname, term, academicYear } = pointsData;

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
  //States initializations
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [options, setOptions] = useState([]);
  const [showUpdatePointsModal, setShowUpdatePointsModal] =useState(
    false
  );
  const [pointsToUpdate, setPointsToUpdate] = useState({});
  const [showDeleteStudentModal, setShowDeleteStudentModal] =useState(
    false
  );
  const [disablePrevButon, setDisablePrevButton] = useState(false);
  const [disableNextButon, setDisableNextButton] = useState(false);

  const handleChangePageReducer = useSelector(
    (state) => state.handleChangePageReducer
  );
  const handleTotalPageReducer = useSelector(
    (state) => state.handleTotalPageReducer
  );
  const pointsReducer=useSelector((state) => state.getPaginationPointsReducer);
  //Action dispatcher
  const dispatch = useDispatch();

  const role = cookie.load("user").role;
  //Custom styles
  const useStyles = makeStyles({
    table: {},
    container: {
      margin: "auto",
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

  //Event handlers

  const handleClickOpen = (point) => {
    // console.log(student)'
    setPointsToUpdate(point);
    setShowUpdatePointsModal(true);
  };

  const handleBackEvent = () => {
    window.location.href = `/points?levelid=${levelid}&subjectname=${subjectname}`;
    // handleBackToStudentList()
  };

  useEffect(() => {
    if (handleChangePageReducer.currentPage <=1) {
      setDisablePrevButton(true);
    }else{
      setDisablePrevButton(false);
    }
    if (handleChangePageReducer.currentPage >=handleTotalPageReducer.totalPages) {
      setDisableNextButton(true);
    }else{
      setDisableNextButton(false);
    }

  }, [handleChangePageReducer.currentPage,handleTotalPageReducer.totalPages]);

  const handlePreviousEvent = async () => {
    dispatch(
      handleMarksPreviousPageChange(handleChangePageReducer.currentPage - 1)
    );
    dispatch(
      await getPaginationPointsAction(
        levelid,
        subjectname,
        term,
        academicYear,
        handleChangePageReducer.currentPage - 1
      )
    );};

  const handleNextPageEvent = async () => {
    dispatch(
      handleMarksNextPageChange(handleChangePageReducer.currentPage + 1)
    );
    dispatch(
      await getPaginationPointsAction(
        levelid,
        subjectname,
        term,
        academicYear,
        handleChangePageReducer.currentPage + 1
      )
    );
  };

  const classes = useStyles();

  return (
    <div className="main-container">
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Student names</StyledTableCell>
              <StyledTableCell align="">Class</StyledTableCell>
              <StyledTableCell align="">CatOne</StyledTableCell>
              <StyledTableCell align="">CatTwo</StyledTableCell>
              <StyledTableCell align="">Exam </StyledTableCell>
              <StyledTableCell align="center">Options</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row"></StyledTableCell>
              <StyledTableCell align=""></StyledTableCell>
              <StyledTableCell align=""></StyledTableCell>
              <StyledTableCell align=""></StyledTableCell>
              <StyledTableCell align=""></StyledTableCell>
              <StyledTableCell align="center">
                <SearchBox
                  handleSearchQuery={handleSearchByStudent}
                  placeholder="Type student name/ Reg number"
                />
              </StyledTableCell>
            </StyledTableRow>
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
                        Update marks
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
            {showBackToPoints ? (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row"></StyledTableCell>
                <StyledTableCell align=""></StyledTableCell>
                <StyledTableCell align=""></StyledTableCell>
                <StyledTableCell align=""></StyledTableCell>
                <StyledTableCell align=""></StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<ArrowBack />}
                    onClick={handleBackEvent}
                  >
                    Back to list
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              ""
            )}
            {!showBackToPoints?!displayNoDataFound?<StyledTableRow>
              <StyledTableCell component="th" scope="row">
                {" "}
                <Button
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<ArrowBack />}
                  onClick={handlePreviousEvent}
                  disabled={disablePrevButon}
                >
                  Previous
                </Button>
              </StyledTableCell>
              <StyledTableCell align=""></StyledTableCell>
              <StyledTableCell align=""></StyledTableCell>
              <StyledTableCell align="">
                {handleChangePageReducer.currentPage} /{" "}
                {handleTotalPageReducer.totalPages}
              </StyledTableCell>
              <StyledTableCell align=""></StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<ArrowForward />}
                  onClick={handleNextPageEvent}
                  disabled={disableNextButon}
                >
                  Next
                </Button>
              </StyledTableCell>
            </StyledTableRow>:"":""}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateMarksModal
        show={showUpdatePointsModal}
        onHide={() => setShowUpdatePointsModal(false)}
        points={pointsToUpdate}
      />
      <ProgressFullPoints />
    </div>
  );
}
export default PointList;
