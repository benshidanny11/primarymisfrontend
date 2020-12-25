import React from 'react'
import { Link } from "react-router-dom";
import cookie from "react-cookies";

function Leftsidebarnav(props) {

   
    const handleGetUSers=()=>{
      //userS.dispatch(getAllUsersAction)
    //  dispatch(getAllUsersAction)
    }

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
                        <Link to="createuser">Add user</Link>
                      </div>
                      <Link to="/allusers" className="nav-link" onClick={handleGetUSers}>
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
                      <Link
                        className="nav-link collapsed"
                        data-toggle="collapse"
                        data-target="#pagesCollapseAuth"
                        aria-expanded="false"
                        aria-controls="pagesCollapseAuth"
                        to="/students"
                      >
                        Students
                        <div className="sb-sidenav-collapse-arrow">
                          <i className="fas fa-angle-down"></i>
                        </div>
                      </Link>
                      
                      <Link
                        className="nav-link collapsed"
                        data-toggle="collapse"
                        data-target="#pagesCollapseError"
                        aria-expanded="false"
                        aria-controls="pagesCollapseError"
                        to="/subjects"
                      >
                        Subjects
                        <div className="sb-sidenav-collapse-arrow">
                          <i className="fas fa-angle-down"></i>
                        </div>
                      </Link>
                      

                     
                    </nav>
                  </div>
                </div>
              </div>

              <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                {
                cookie.load("user").names
                }
              </div>
            </nav>
          </div>
          
        )
   
}
export default Leftsidebarnav