import React, { useState } from "react";
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
  CircularProgress,
} from "@material-ui/core";
import ContentLoader from "react-content-loader";
import { Visibility, ArrowBack } from "@material-ui/icons";
import cookies from "react-cookies";
import UpdateUser from "./../modals/updateUSerModal";

import UserMenu from "../menus/userMenu";
import Deletestudentmodal from "../modals/deleteStudentModal";
import DeleteUser from "../modals/deleteUSerModal";

function Userslist({ users, isLoading }) {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [actionUser, setActionUser] = useState({});
  const [userOptions, setUserOptions] = useState([]);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = React.useState(
    false
  );

  const { role } = cookies.load("user");

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

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const useStyles = makeStyles({
    table: {},
    container: {
      width: 1100,
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
            {users.length !== 0 ? (
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
                    <StyledTableCell align="">
                      {" "}
                      <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        className={classes.button}
                        startIcon={<Visibility />}
                        onClick={()=>handleClickOpenUserMenu(user)}
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
          </TableBody>
        </Table>
      </TableContainer>
      <UserMenu
        user={selectedUser}
        open={openUserMenu}
        onClose={handleOnSelectedOption}
        options={userOptions}
      />

      <UpdateUser
        show={showUpdateUserModal}
        onHide={() => setShowUpdateUserModal(false)}
        user={actionUser}
      />
      <DeleteUser
        showDeleteWarning={showDeleteUserModal}
        handleHideModal={()=>setShowDeleteUserModal(false)}
        userid={actionUser.userid}
        name={actionUser.names}
      />
    </div>
  );
}
export default Userslist;
