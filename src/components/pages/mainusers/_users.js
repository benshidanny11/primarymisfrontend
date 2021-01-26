import React, { useEffect } from "react";

import { getAllUsersAction,getOneUserAction } from "../../../redux/action";
import { connect } from "react-redux";
import Userslist from "./lists/userslist";
import UpperUser from "./upperlayer/upperUser";
import cookies from "react-cookies";
import AddUserModal from "./modals/addUserModal";
import {$} from "react-jquery-plugin";

class Users extends React.Component {
  state = {
    users: [],
    isLoading:false,
    showAddUserModal:false,
    showBackToUsers:false,
    displayNoDataFound:false
  };

  async componentDidMount() {
    this.props.getAllUsersAction();
  }
  componentDidUpdate(prevProps, prevState) {
  
    

  }
  componentWillReceiveProps({ getAllUsers, loadingType ,foundUser,getOneUserType}) {
    console.log("User one type",getOneUserType);
    this.setState({
      users: getAllUsers,
      isLoading:true,
    });

    if(getOneUserType==="loading-get-one-user"){
      $("#progresssdotfull").removeClass("progressdothide");

    }else if(getOneUserType==="error-get-one-user")
    {
      this.setState(
        {
          showBackToUsers:true,
        }
      )
      this.setState({ displayNoDataFound: true });
      this.setState({ users: [] });
      $("#progresssdotfull").addClass("progressdothide");
    }else if(getOneUserType==="success-get-one-user"){
      $("#progresssdotfull").addClass("progressdothide")
      this.setState({ users: foundUser });
      this.setState(
        {
          showBackToUsers:true
        }
      )
    }

  }

  //Handlers

  handleShowModal(){
    console.log("Handler triggerd")
    this.setState({
      showAddUserModal:true
    })
  }
  handleSearchUser(searchQuery){
    this.props.getOneUserAction(searchQuery);
  }

  render() {
    const { users,isLoading ,showAddUserModal,showBackToUsers,displayNoDataFound} = this.state;
    const {role} =cookies.load("user");
    const newUsers=users.filter((user)=>user.role!==role)
    return (
    <div  className="d-block">
      <UpperUser  handleShowModal={this.handleShowModal.bind(this)}/>
      <div className="breadcrumb mb-4 breadcrumb-item active message-container">
          <span className="">
            THere are {newUsers.length} users
          </span>
        </div>
       <Userslist users={newUsers} handleSearchUser={this.handleSearchUser.bind(this)} showBackToUsers={showBackToUsers} displayNoDataFound={displayNoDataFound}/>
       <AddUserModal
        show={showAddUserModal}
        onHide={() => this.setState({showAddUserModal:false})} />
    </div> 
    )
  }
}

const mapStateToProps = ({ getAllUsersReducer, getOneUserReducer}) => {
  
  return {
    getAllUsers: getAllUsersReducer.users,
    loadingType: getAllUsersReducer.type,
    foundUser:getOneUserReducer.user,
    getOneUserType:getOneUserReducer.type
  };
}
export default connect(mapStateToProps, { getAllUsersAction,getOneUserAction })(Users);
