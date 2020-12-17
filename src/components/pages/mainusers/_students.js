import React, { Component } from "react";
import {
  getAllStudentsAction,
  handleLevelChangeAction,
} from "../../../redux/action";
import { connect } from "react-redux";
import StudentList from "./lists/studentList";
import LevelList from "./selectors/levelselector";
class Students extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      isLoading: false,
      levelid: 1,
    };
  }

  componentDidMount() {
    const { levelid } = this.state;
    this.props.getAllStudentsAction(levelid);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { levelid } = this.state;

    if (prevProps.levelid !== this.props.levelid) {
      this.props.getAllStudentsAction(levelid);
    }
  }

  componentWillReceiveProps({ allStudents, levelid }) {
    console.log(allStudents);
    this.setState({
      levelid,
    });
    if (allStudents) this.setState({ students: allStudents });
  }

  componentWillUnmount() {}
  handleEvent() {}
  handler = () => {
    this.setState();
  };

  render() {
    const { students,levelid } = this.state;
    return (
      <div className="d-block">
        
        <LevelList handelLevelChange={this.props.handleLevelChangeAction} />
        <div className="breadcrumb mb-4 breadcrumb-item active message-container">
          <span className="">THere are {students.length} Students in P {levelid}</span>
        </div>
        <StudentList students={students} />
      </div>
    );
  }
}

const mapStateToProps = ({ studentReducer }) => {
  return {
    allStudents: studentReducer.students,
    levelid: studentReducer.payload,
  };
};

export default connect(mapStateToProps, {
  getAllStudentsAction,
  handleLevelChangeAction,
})(Students);
