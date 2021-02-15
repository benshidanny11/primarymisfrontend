import React, { Component } from "react";
import ClassList from "./lists/ClassList";
import {
    getAllClassessAction
} from "../../../redux/action";
import { connect } from "react-redux";
import _ from "lodash";
import cookie from "react-cookies";
class AllClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: [],
      displayNoDataFound: false,
      showModal: false,
      teachers: [],
      levelid: this.props.match.params.levelid,
    };
  }
  componentDidMount() {
    const { levelid } = this.state;
    this.props.getAllClassessAction(levelid);
    
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { levelid } = this.state;

    if (prevProps.levelid !== this.props.levelid) {
      this.props.getAllClassessAction(levelid);
    }
  }

  componentWillReceiveProps({ allClasses }) {
    if (allClasses) {
      if (allClasses.length === 0) {
        this.setState({ displayNoDataFound: true });
        this.setState({ classes: allClasses });
      } else {
        this.setState({ displayNoDataFound: false });
        this.setState({ classes: allClasses });
      }
    }
  }
  render() {
    const {
      classes,
      displayNoDataFound
    } = this.state;
     console.log('in class'+classes)
    return (
      <div className="d-block">
        <ClassList
          allClasses={classes}
          displayNoDataFound={displayNoDataFound}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
    getAllClassesReducer,
}) => {
  return {
    classes: getAllClassesReducer.classes,
    type: getAllClassesReducer.type,
  };
};

export default connect(mapStateToProps, {
  getAllClassessAction,
})(AllClass);
