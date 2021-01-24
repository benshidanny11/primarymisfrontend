import React, { useEffect } from "react";

import { getAllUsersAction } from "../../../redux/action";
import { connect } from "react-redux";
import Userslist from "./lists/userslist";
import UpperUser from "./upperlayer/upperUser";
import cookies from "react-cookies";
import AddUserModal from "./modals/addUserModal";

class Users extends React.Component {
  state = {
    users: [],
    isLoading:false,
    showAddUserModal:false,
  };

  async componentDidMount() {
    this.props.getAllUsersAction();
  }
  componentDidUpdate(prevProps, prevState) {
  
    

  }
  componentWillReceiveProps({ getAllUsers, loadingType }) {
    console.log(loadingType);
    this.setState({
      users: getAllUsers,
      isLoading:true,
    });
  }

  //Handlers

  handleShowModal(){
    console.log("Handler triggerd")
    this.setState({
      showAddUserModal:true
    })
  }

  render() {
    const { users,isLoading ,showAddUserModal} = this.state;
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
       <Userslist users={newUsers} isLoading={isLoading}/>;
       <AddUserModal
        show={showAddUserModal}
        onHide={() => this.setState({showAddUserModal:false})} />
    </div> 
    )
  }
}

const mapStateToProps = ({ getAllUsersReducer }) => {
  console.log(getAllUsersReducer.type);
  return {
    getAllUsers: getAllUsersReducer.users,
    loadingType: getAllUsersReducer.type,
  };
};
export default connect(mapStateToProps, { getAllUsersAction })(Users);
