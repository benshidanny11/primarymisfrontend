import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom";

export default class Leftsidebarnav extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }

        this.handleEvent = this.handleEvent.bind(this)
    }

    componentDidMount() {
        
    }

    componentDidUpdate(prevProps, prevState, snapshot) { if (prevState.name !== this.state.name) { this.handler() } }

    componentWillUnmount() {
        
    }

    // Prototype methods, Bind in Constructor (ES2015)
    handleEvent() {}

    // Class Properties (Stage 3 Proposal)
    handler = () => { this.setState() }

    render() {
        return (
            <div id="layoutSidenav_nav">
            <nav
              className="sb-sidenav accordion sb-sidenav-light"
              id="sidenavAccordion"
            >
              <div className="sb-sidenav-menu">
                <div className="nav">
                  <div className="nav-link">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-home"></i>
                    </div>
                    <Link to="/">Dashboard</Link>
                  </div>
                  <div
                    className="nav-link collapsed"
                    href="#"
                    data-toggle="collapse"
                    data-target="#collapseLayouts"
                    aria-expanded="false"
                    aria-controls="collapseLayouts"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-user"></i>
                    </div>
                    Users management
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </div>
                  <div
                    className="collapse"
                    id="collapseLayouts"
                    aria-labelledby="headingOne"
                    data-parent="#sidenavAccordion"
                  >
                    <nav className="sb-sidenav-menu-nested nav">
                      <div className="nav-link">
                        <Link to="adduser">Add user</Link>
                      </div>

                      <Link to="/updateuser" className="nav-link">
                        Update user
                      </Link>
                      <Link to="/viewusers" className="nav-link">
                        All users
                      </Link>
                    </nav>
                  </div>
                  <div
                    className="nav-link collapsed"
                    href="#"
                    data-toggle="collapse"
                    data-target="#collapsePages"
                    aria-expanded="false"
                    aria-controls="collapsePages"
                  >
                    <div className="sb-nav-link-icon">
                      <i class="fas fa-graduation-cap"></i>
                    </div>
                    School management
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </div>
                  <div
                    className="collapse"
                    id="collapsePages"
                    aria-labelledby="headingTwo"
                    data-parent="#sidenavAccordion"
                  >
                    <nav
                      className="sb-sidenav-menu-nested nav accordion"
                      id="sidenavAccordionPages"
                    >
                      <div
                        className="nav-link collapsed"
                        data-toggle="collapse"
                        data-target="#pagesCollapseAuth"
                        aria-expanded="false"
                        aria-controls="pagesCollapseAuth"
                      >
                        Students
                        <div className="sb-sidenav-collapse-arrow">
                          <i className="fas fa-angle-down"></i>
                        </div>
                      </div>
                      <div
                        className="collapse"
                        id="pagesCollapseAuth"
                        aria-labelledby="headingOne"
                        data-parent="#sidenavAccordionPages"
                      >
                        <nav className="sb-sidenav-menu-nested nav">
                          <Link className="nav-link" to="addstudent">
                            Add new student
                          </Link>

                          <Link className="nav-link" to="getstudents">
                            View students
                          </Link>

                          <Link className="nav-link" to="updatestudent">
                            Update student
                          </Link>
                        </nav>
                      </div>
                      <div
                        className="nav-link collapsed"
                        data-toggle="collapse"
                        data-target="#pagesCollapseError"
                        aria-expanded="false"
                        aria-controls="pagesCollapseError"
                      >
                        Subjects
                        <div className="sb-sidenav-collapse-arrow">
                          <i className="fas fa-angle-down"></i>
                        </div>
                      </div>
                      <div
                        className="collapse"
                        id="pagesCollapseError"
                        aria-labelledby="headingOne"
                        data-parent="#sidenavAccordionPages"
                      >
                        <nav className="sb-sidenav-menu-nested nav">
                          <Link className="nav-link" to="addsubject">
                            Add new subject
                          </Link>

                          <Link className="nav-link" to="getsubjects">
                            View subjects
                          </Link>

                          <Link className="nav-link" to="updatesubject">
                            Update subject
                          </Link>
                        </nav>
                      </div>

                     
                    </nav>
                  </div>
                </div>
              </div>

              <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                {
                  "Benshi danny" /* {`${this.props.user.firstName} ${this.props.user.lastname}`} */
                }
              </div>
            </nav>
          </div>
          
        )
    }
}
