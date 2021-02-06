import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { Visibility, ArrowBack, ArrowForward } from "@material-ui/icons";

import { Typography } from "@material-ui/core";

import StudentMenu from "../menus/studentMenu";

import cookie from "react-cookies";
import generatePDF from "../report/reportGenerator";
import generateReport from "../report/anualReport";
import {
  hideModalAction,
  handlePreviousPageChange,
  handleNextPageChange,
  getStudentsInPaginationAction,
} from "../../../../redux/action";

import Updatestudentmodal from "../modals/updateStudentModal";
import Deletestudentmodal from "../modals/deleteStudentModal";
import ReportDataChooserModal from "../modals/reportDataChooserModal";
import SearchBox from "../filterers/searchBox";
import {ProgressFull} from "../modals/progressFullModal";
import { $ } from "react-jquery-plugin";

function Userslist({
  students,
  displayNoDataFound,
  handleSearchStudent,
  showBackToStudents,
  handleBackToStudentList,
  studentData,
}) {
  //-------------------Custom styles--------------------
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
      "&:nth-of-type(even)": {
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
  ///---------------End of stylse--------

  //-----------------State and variable initialization--------------------

  const [open, setOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState({});
  const [options, setOptions] = React.useState([]);
  const [showUpdateStudentModal, setShowUpdateStudentModal] = React.useState(
    false
  );
  const [actionStudent, setActionStudent] = React.useState({});
  const [showDeleteStudentModal, setShowDeleteStudentModal] = React.useState(
    false
  );
  const [showReportDataChooser, setShowReportDataChooser] = React.useState(
    false
  );

  const [resetReportData, setResetReportData] = React.useState(false);
  const [disablePrevButon, setDisablePrevButton] = React.useState(false);
  const [disableNextButon, setDisableNextButton] = React.useState(false);
  const role = cookie.load("user").role;

  //Redux state loading
  const dispatch = useDispatch();

  const handleChangePageReducer = useSelector(
    (state) => state.handleChangePageReducer
  );
  const handleTotalPageReducer = useSelector(
    (state) => state.handleTotalPageReducer
  );
  const getStudentReportDataInTermReducer = useSelector(
    (state) => state.getStudentReportDataInTermReducer
  );
  const getStudentAnualReportDataReducer = useSelector(
    (state) => state.getStudentAnualReportDataReducer
  );
  const hideModalReducer = useSelector((state) => state.hideModalReducer);

  const studentReducer = useSelector((state) => state.paginationStudentReducer);

  //---------------End of state and variable initialization------------

  //-----Handlers-----------

  const handleClickOpen = (student) => {
    setSelectedStudent(student);
    if (role === "HEAD_MASTER") {
      setOptions([
        ["View student report", "fas fa-file-invoice"],
        ["Send report to parent", "far fa-share-square"],
        ["Update student", "fas fa-user-edit"],
        ["Delete student", "fas fa-trash-alt"],
      ]);
    }
    setOpen(true);
  };

  const handleHideDeleteModal = () => {
    setShowDeleteStudentModal(false);
  };

  const handleClose = ({ student, option }) => {
    setActionStudent(student);
    if (option === "Update student") {
      setShowUpdateStudentModal(true);
    } else if (option === "Delete student") {
      setShowDeleteStudentModal(true);
    } else if (option === "View student report") {
      // setShowReportDataChooser(true);
      dispatch(hideModalAction(true));
    }
    setOpen(false);
  };

  const handleCancelEvent = () => {
    setResetReportData(true);
    setShowReportDataChooser(false);
  };

  const handleBackEvent = () => {
    window.location.href = "/students";
    // handleBackToStudentList()
  };

  const handlePreviousEvent = async () => {
    dispatch(handlePreviousPageChange(handleChangePageReducer.currentPage - 1));
    dispatch(
      await getStudentsInPaginationAction(
        levelid,
        academicYear,
        handleChangePageReducer.currentPage - 1,
        "paginationloading"
      )
    );
  };
  const handleNextPageEvent = async () => {
    dispatch(handleNextPageChange(handleChangePageReducer.currentPage + 1));
    dispatch(
      await getStudentsInPaginationAction(
        levelid,
        academicYear,
        handleChangePageReducer.currentPage + 1,
        "paginationloading"
      )
    );
  };
  //-------------End of handlers section---------------

  //-----Hooks (UseEffect)---------------

  useEffect(() => {
    //Report data is in report data array constant, you can now call report pdf here
    if (getStudentReportDataInTermReducer.type === "success-get-report-data") {
      const reportData = getStudentReportDataInTermReducer.points;
      // console.log(reportData)
      generatePDF(reportData);
    }
  }, [getStudentReportDataInTermReducer.type]);
  //anual report
  useEffect(() => {
    //Report data is in report data array constant, you can now call report pdf here
    if (
      getStudentAnualReportDataReducer.type === "success-get-anual-report-data"
    ) {
      const report = getStudentAnualReportDataReducer.points;
      // console.log(reportData)
      generateReport(report);
    }
  }, [getStudentAnualReportDataReducer.type]);

  useEffect(() => {
    if (handleChangePageReducer.currentPage <= 1) {
      setDisablePrevButton(true);
    } else {
      setDisablePrevButton(false);
    }
    if (
      handleChangePageReducer.currentPage >= handleTotalPageReducer.totalPages
    ) {
      setDisableNextButton(true);
    } else {
      setDisableNextButton(false);
    }
  }, [handleChangePageReducer.currentPage]);

  useEffect(() => {
    if (
      handleChangePageReducer.currentPage >= handleTotalPageReducer.totalPages
    ) {
      setDisableNextButton(true);
    } else {
      setDisableNextButton(false);
    }
  }, [handleTotalPageReducer.totalPages]);

  // useEffect(() => {
  //  console.log("Typess",studentReducer.type)
  //   if(studentReducer.type==="loading-pagination")
  //   {
  //     $("#progresssdotfull").removeClass("progressdothide")
  //   }else if(studentReducer.type==="success-pagination"){
  //     $("#progresssdotfull").addClass("progressdothide")
  //   }else if(studentReducer.type==="error-pagination"){
  //     $("#progresssdotfull").addClass("progressdothide")
  //   }

  // }, [studentReducer.type]);

  const { levelid, academicYear } = studentData;
  // console.log("Total pages=====>",handleTotalPageReducer.totalPages);
  const classes = useStyles();

  return (
    <div className="main-container">
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
            <StyledTableRow>
              <StyledTableCell component="th" scope="row"></StyledTableCell>
              <StyledTableCell align=""></StyledTableCell>
              <StyledTableCell align=""></StyledTableCell>
              <StyledTableCell align=""></StyledTableCell>
              <StyledTableCell align="center">
                <SearchBox
                  handleSearchQuery={handleSearchStudent}
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
                No students found
              </Typography>
            ) : students.length !== 0 ? (
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
                  <StyledTableCell align="">
                    {student.classname}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    <Button
                      aria-controls="customized-menu"
                      aria-haspopup="true"
                      variant="contained"
                      className={classes.button}
                      startIcon={<Visibility />}
                      onClick={() => handleClickOpen(student)}
                    >
                      View more
                    </Button>
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
            {showBackToStudents ? (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row"></StyledTableCell>
                <StyledTableCell align=""></StyledTableCell>
                <StyledTableCell align=""></StyledTableCell>
                <StyledTableCell align=""></StyledTableCell>
                <StyledTableCell align="center">
                  {/* <CustomClickableButton
                    type="submit"
                    label="Continue"
                    className="btn-submit"
                    handleClickEvent={handleBackToStudents}
                  /> */}
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
            {!showBackToStudents?!displayNoDataFound?
              <StyledTableRow>
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
                <StyledTableCell align="">
                  {handleChangePageReducer.currentPage} /{" "}
                  {handleTotalPageReducer.totalPages}
                </StyledTableCell>
                <StyledTableCell align=""> </StyledTableCell>
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
        <StudentMenu
          student={selectedStudent}
          open={open}
          onClose={handleClose}
          options={options}
          handleOnDismis={() => setOpen(false)}
        />
      </TableContainer>
      <Updatestudentmodal
        show={showUpdateStudentModal}
        onHide={() => setShowUpdateStudentModal(false)}
        student={actionStudent}
      />
      <Deletestudentmodal
        showDeleteWarning={showDeleteStudentModal}
        handleHideModal={handleHideDeleteModal}
        id={actionStudent.studentid}
      />
      <ReportDataChooserModal
        show={hideModalReducer.showModal}
        resetData={resetReportData}
        onHide={() => dispatch(hideModalAction(false))}
        handleHideModal={handleCancelEvent}
        studentdata={{
          studentid: actionStudent.studentid,
          levelid: actionStudent.levelid,
        }}
      />
      <ProgressFull />
    </div>
  );
}
export default Userslist;
