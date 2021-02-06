import React, { useEffect } from "react";

import {
  getAllUsersAction,
  getOneUserAction,
  handleUserTotalPageAction,
} from "../../../redux/action";
import { connect } from "react-redux";
import Userslist from "./lists/userslist";
import UpperUser from "./upperlayer/upperUser";
import cookies from "react-cookies";
import AddUserModal from "./modals/addUserModal";
import { $ } from "react-jquery-plugin";

class Users extends React.Component {
  state = {
    users: [],
    isLoading: false,
    showAddUserModal: false,
    showBackToUsers: false,
    displayNoDataFound: false,
    currentPage: 1,
  };

  async componentDidMount() {
    const { currentPage } = this.state;
    this.props.getAllUsersAction(currentPage);
  }
  componentDidUpdate(prevProps, prevState) {
    const { totalPages } = this.props;
    console.log("Total user pages", totalPages);
    if (prevProps.totalPages !== totalPages) {
      this.props.handleUserTotalPageAction(totalPages)
    }
  }
  componentWillReceiveProps({
    getAllUsers,
    loadingType,
    foundUser,
    getOneUserType,
    paginationType,
    paginatedUsers
  }) {
    console.log("User one type", getOneUserType);
    this.setState({
      users: getAllUsers,
      isLoading: true,
    });

    if (getOneUserType === "loading-get-one-user") {
      $("#progresssdotfull").removeClass("progressdothide");
    } else if (getOneUserType === "error-get-one-user") {
      this.setState({
        showBackToUsers: true,
      });
      this.setState({ displayNoDataFound: true });
      this.setState({ users: [] });
      $("#progresssdotfull").addClass("progressdothide");
    } else if (getOneUserType === "success-get-one-user") {
      $("#progresssdotfull").addClass("progressdothide");
      this.setState({ users: foundUser });
      this.setState({
        showBackToUsers: true,
      });
    }
    if(paginationType==="loading-get-paginated-users"){
      this.setState({ users: [] });
  
    }else if(paginationType==="success-get-paginated-users"){
      this.setState({ displayNoDataFound: false });
        this.setState({ users: paginatedUsers });
    }
    else if(paginationType==="error-get-paginated-users"){
      this.setState({ displayNoDataFound: true });
      this.setState({ users: [] });
    }
  }

  //Handlers

  handleShowModal() {
    console.log("Handler triggerd");
    this.setState({
      showAddUserModal: true,
    });
  }
  handleSearchUser(searchQuery) {
    this.props.getOneUserAction(searchQuery);
  }

  render() {
    const {
      users,
      isLoading,
      showAddUserModal,
      showBackToUsers,
      displayNoDataFound,
    } = this.state;
    const { role } = cookies.load("user");
    const newUsers = users.filter((user) => user.role !== role);
    return (
      <div className="d-block">
        <UpperUser handleShowModal={this.handleShowModal.bind(this)} />
        <div className="breadcrumb mb-4 breadcrumb-item active message-container">
          <span className="">THere are {newUsers.length} users</span>
        </div>
        <Userslist
          users={newUsers}
          handleSearchUser={this.handleSearchUser.bind(this)}
          showBackToUsers={showBackToUsers}
          displayNoDataFound={displayNoDataFound}
        />
        <AddUserModal
          show={showAddUserModal}
          onHide={() => this.setState({ showAddUserModal: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ getAllUsersReducer, getOneUserReducer,getPaginatedUsersReducer }) => {
 console.log("Paginated users===>",getPaginatedUsersReducer)
 
  return {
    getAllUsers: getAllUsersReducer.users,
    loadingType: getAllUsersReducer.type,
    foundUser: getOneUserReducer.user,
    getOneUserType: getOneUserReducer.type,
    totalPages: getAllUsersReducer.totalPages,
    paginatedUsers:getPaginatedUsersReducer.users,
    paginationType:getPaginatedUsersReducer.type
  };
};
export default connect(mapStateToProps, {
  getAllUsersAction,
  getOneUserAction,
  handleUserTotalPageAction,
})(Users);
