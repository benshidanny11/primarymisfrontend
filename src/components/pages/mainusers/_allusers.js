import React, { useEffect } from "react";

import { getAllUsersAction } from "../../../redux/action";
import { connect } from "react-redux";
import Userslist from "./lists/userslist";

class AllUSers extends React.Component {
  state = {
    users: [],
    isLoading:false
  };

  async componentDidMount() {
    this.props.getAllUsersAction();
  }
  componentDidUpdate(prevProps, prevState) {
   console.log(prevProps)
  }
  componentWillReceiveProps({ getAllUsers, loadingType }) {
    console.log(loadingType);
    this.setState({
      users: getAllUsers,
      isLoading:true,
    });
  }
  render() {
    const { users,isLoading } = this.state;
    return <Userslist users={users} isLoading={isLoading}/>;
  }
}

const mapStateToProps = ({ getAllUsersReducer }) => {
  console.log(getAllUsersReducer.type);
  return {
    getAllUsers: getAllUsersReducer.users,
    loadingType: getAllUsersReducer.type,
  };
};
export default connect(mapStateToProps, { getAllUsersAction })(AllUSers);
