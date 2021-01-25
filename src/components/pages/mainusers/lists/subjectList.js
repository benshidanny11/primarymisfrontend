import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";

import { Typography } from "@material-ui/core";
import { setStudnetFilterData } from "../../../../redux/action";

import YearChooserMenu from "../menus/yearChooserMenu";
import _ from "lodash";
import cookie from "react-cookies";


import DeleteUsermodal from "../modals/deleteUSerModal";
import AddMarksModal from "../modals/addPointsModal";
import { Studentlistmodal } from "../modals/studentListModal";
import SUbjectMenu from "../menus/subjectMenu";
import UpdateSubjectModal from "../modals/updateSubjectModal";

function SubjectList({ subjects, displayNoDataFound,handleSearchStudent }) {
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#1168ca",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  const dispatch = useDispatch();

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  // States and their setters
  const [open, setOpen] = React.useState(false);
  const [selectedSubject, setSelectedSubject] = React.useState({});
  const [options, setOptions] = React.useState([]);
  const [showUpdateSubjectModal, setShowUpdateSubjectModal] = React.useState(
    false
  );
  const [actionSubject, setActionSubject] = React.useState({});

  const [showAddMarksModal, setShowAddMarksModal] = React.useState(false);
  const [showLoadingIndicator, setShowLoadingIndicator] = React.useState(false);
  const [showStudentListModal, setShowStudentListModal] = React.useState(false);
  const [subjectName, setSubjectName] = React.useState("");
  const [students, setStudents] = React.useState([]);
  const [marksData, setMarksData] = React.useState({});
  const [openYearChooser,setOpenYearChooser]=React.useState(false);
   const [marksAdacemicYear,setMarksAcademicYear]=React.useState("");

  const role = cookie.load("user").role;
  // console.log(subjects);

  const studentReducer = useSelector((state) => state.getOneStudentReducer);
  //Use efffect hook
  useEffect(() => {
    if (studentReducer.type === "loading-get-one-student") {
      setShowLoadingIndicator(true);
    } else if (studentReducer.type === "error-get-one-student") {
      setShowLoadingIndicator(false);
      //setShowStudentListModal(false);
      console.log(studentReducer.data.data.message)
    } else if (studentReducer.type === "success-get-one-student") {
      setShowLoadingIndicator(false);
      if (studentReducer.students) {
        if (studentReducer.students.length > 0) {
          setStudents(studentReducer.students);
        }
      }
    }
  }, [studentReducer.type]);

  //Styles

  const useStyles = makeStyles({
    table: {},
    container: {
      width: 1120,
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
  const handleClickOpen = (subject) => {
    setSelectedSubject(subject);
    if (role === "HEAD_MASTER") {
      setOptions([
        ["View subject marks", "fas fa-file-invoice"],
        ["Update subject", "fas fa-user-edit"],
        ["Disactivate subject", "fas fa-trash-alt"],
      ]);
    } else if (role === "TEACHER") {
      setOptions([
        ["Add subject marks", "fas fa-plus"],
        ["View subject marks", "fas fa-file-invoice"],
      ]);
    }
    setOpen(true);
  };
  const handleMarksData = (student, subjectName) => {
    const marksData = {
      studentId: student.studentid,
      studenName: student.studentnames,
      levelid: student.levelid,
      subjectName: subjectName,
    };
    setMarksData(marksData);
    setShowStudentListModal(false);
    setShowAddMarksModal(true);
  };
  const handleClose = async ({ subject, option }) => {
    setActionSubject(subject);

    if (option === "Update subject") {
      setShowUpdateSubjectModal(true);
    } else if (option === "Add subject marks") {
    
      setSubjectName(subject.subjectname);
      setOpenYearChooser(true);
    } else if (option === "View subject marks") {
      window.location.href = `/points?levelid=${subject.levelid}&subjectname=${subject.subjectname}`;
    }
    setOpen(false);
  };
  const classes = useStyles();

  const onChooseYear=async(year)=>{
    const levelid=actionSubject.levelid;
    const academicYear=year;
     setMarksAcademicYear(academicYear);
    dispatch(setStudnetFilterData(levelid,academicYear));
    setShowStudentListModal(true);
    setOpenYearChooser(false);
  }
  return (
    <div className="main-container">
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Subject name</StyledTableCell>
              <StyledTableCell align="">CATMax</StyledTableCell>
              <StyledTableCell align="">ExamMax</StyledTableCell>
              {role!=="TEACHER"?<StyledTableCell align="">Teacher</StyledTableCell>:""}
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
                No subjects found
              </Typography>
            ) : subjects.length !== 0 ? (
              subjects.map((subject, key) => (
                <StyledTableRow key={key}>
                  <StyledTableCell component="th" scope="row">
                    {subject.subjectname}
                  </StyledTableCell>
                  <StyledTableCell align="">{subject.catmax}</StyledTableCell>
                  <StyledTableCell align="">{subject.exammax}</StyledTableCell>
                  {role!=="TEACHER"?<StyledTableCell align="">{subject.names}</StyledTableCell>:""}
                  <StyledTableCell align="center">
                    {" "}
                    <Button
                      aria-controls="customized-menu"
                      aria-haspopup="true"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<Visibility />}
                      onClick={() => handleClickOpen(subject)}
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
          </TableBody>
        </Table>
        <SUbjectMenu
          subject={selectedSubject}
          open={open}
          onClose={handleClose}
          options={options}
        />
        <YearChooserMenu
          open={openYearChooser}
          onChooseYear={onChooseYear}
        />
      </TableContainer>
      <Studentlistmodal
        students={students}
        subjectName={subjectName}
        showLoading={showLoadingIndicator}
        show={showStudentListModal}
        handleMarksData={handleMarksData}
        onHide={() => setShowStudentListModal(false)}
        handleSearchStudent={handleSearchStudent}
      />
      <AddMarksModal
        marksData={marksData}
        academicYear={marksAdacemicYear}
        show={showAddMarksModal}
        onHide={() => setShowAddMarksModal(false)}
      />
      <UpdateSubjectModal
        show={showUpdateSubjectModal}
        onHide={() => setShowUpdateSubjectModal(false)}
        subject={actionSubject}
      />
    </div>
  );
}
export default SubjectList;
