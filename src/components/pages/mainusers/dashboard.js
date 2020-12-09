import React, { Component } from "react";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import Home from "./home";
import AddUser from "./adduser";
import Header from "./common/header";
import Leftsidebarnav from "./common/leftSidebarnav";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleEvent = this.handleEvent.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.name !== this.state.name) {
      this.handler();
    }
  }

  componentWillUnmount() {}

  handleEvent() {}

  handler = () => {
    this.setState();
  };

  render() {
    return (
      <div className="sb-nav-fixed">
        <Header />
        <div id="layoutSidenav">
          <Leftsidebarnav/>
          <div id="layoutSidenav_content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/adduser" component={AddUser} />
            </Switch>

            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">Copyright &copy; Source dev</div>
                  <div>
                    <a href="#">
                      {" "}
                      Powered by <strong>Source dev</strong>
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
