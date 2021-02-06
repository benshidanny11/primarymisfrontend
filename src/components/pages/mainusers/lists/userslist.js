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
import cookies from "react-cookies";
import UpdateUser from "./../modals/updateUSerModal";

import UserMenu from "../menus/userMenu";
import DeleteUser from "../modals/deleteUSerModal";
import SearchBox from "../filterers/searchBox";
import { CustomClickableButton } from "../styledcontrols/buttons";
import { useSelector, useDispatch } from "react-redux";
import {ProgressFull} from "../modals/progressFullModal";
import {
  handleUserNextPageChange,
  handleUserPreviousPageChange,
  getPaginatedUsersAction,
} from "../../../../redux/action";

function Userslist({
  users,
  handleSearchUser,
  showBackToUsers,
  displayNoDataFound,
}) {
  ///-----States and variables declarations
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [actionUser, setActionUser] = useState({});
  const [userOptions, setUserOptions] = useState([]);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = React.useState(false);
  const [disablePrevButon, setDisablePrevButton] = React.useState(false);
  const [disableNextButon, setDisableNextButton] = React.useState(false);

  //Variables Declarations

  const { role } = cookies.load("user");
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

  //Use effect hoocks

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
  }, [handleChangePageReducer.currentPage, handleTotalPageReducer.totalPages]);

  //Event handlers

  const handleClickOpenUserMenu = (user) => {
    // console.log(student)
    setSelectedUser(user);
    if (role === "HEAD_MASTER") {
      setUserOptions([
        ["Update user", "fas fa-user-edit"],
        ["Delete user", "fas fa-trash-alt"],
      ]);
    }
    setOpenUserMenu(true);
  };
  const handleOnSelectedOption = ({ user, option }) => {
    setActionUser(user);
    if (option === "Update user") {
      setShowUpdateUserModal(true);
    } else if (option === "Delete user") {
      setShowDeleteUserModal(true);
    }
    setOpenUserMenu(false);
  };

  const handlePreviousPageEvent = async () => {
    dispatch(
      handleUserPreviousPageChange(handleChangePageReducer.currentPage - 1)
    );
    dispatch(
      await getPaginatedUsersAction(handleChangePageReducer.currentPage - 1)
    );
  };
  const handleNextPageEvent = async () => {
    dispatch(handleUserNextPageChange(handleChangePageReducer.currentPage + 1));
    dispatch(
      await getPaginatedUsersAction(handleChangePageReducer.currentPage + 1)
    );
  };

  return (
    <div>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Full name</StyledTableCell>
              <StyledTableCell align="">Email address</StyledTableCell>
              <StyledTableCell align="">Phone number</StyledTableCell>
              <StyledTableCell align="">User role</StyledTableCell>
              <StyledTableCell align="center">Options</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row"></StyledTableCell>
              <StyledTableCell align=""></StyledTableCell>
              <StyledTableCell align=""></StyledTableCell>
              <StyledTableCell align=""></StyledTableCell>
              <StyledTableCell align="right">
                <SearchBox
                  handleSearchQuery={handleSearchUser}
                  placeholder="Type name of user"
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
                No users found
              </Typography>
            ) : users.length !== 0 ? (
              users.map((user, key) =>
                user.role !== role ? (
                  <StyledTableRow key={key}>
                    <StyledTableCell component="th" scope="row">
                      {user.names}
                    </StyledTableCell>
                    <StyledTableCell align="">{user.email}</StyledTableCell>
                    <StyledTableCell align="">
                      {user.phonenumber}
                    </StyledTableCell>
                    <StyledTableCell align="">
                      {user.role === "TEACHER" ? "Teacher" : "Dos"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {" "}
                      <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        className={classes.button}
                        startIcon={<Visibility />}
                        onClick={() => handleClickOpenUserMenu(user)}
                      >
                        View more
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ) : (
                  ""
                )
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
            {showBackToUsers ? (
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
                    onClick={() => (window.location.href = "/users")}
                  >
                    Back to list
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              ""
            )}
            {!showBackToUsers?!displayNoDataFound?
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
                    onClick={handlePreviousPageEvent}
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
      </TableContainer>
      <UserMenu
        user={selectedUser}
        open={openUserMenu}
        onClose={handleOnSelectedOption}
        options={userOptions}
        handleOnDismiss={() => setOpenUserMenu(false)}
      />

      <UpdateUser
        show={showUpdateUserModal}
        onHide={() => setShowUpdateUserModal(false)}
        user={actionUser}
      />
      <DeleteUser
        showDeleteWarning={showDeleteUserModal}
        handleHideModal={() => setShowDeleteUserModal(false)}
        userid={actionUser.userid}
        name={actionUser.names}
      />
      <ProgressFull />
    </div>
  );
}
export default Userslist;
