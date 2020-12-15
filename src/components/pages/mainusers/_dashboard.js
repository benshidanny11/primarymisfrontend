import React  from "react";
import {  Route, Switch } from "react-router-dom";
import {Redirect} from "react-router";

import Header from "../common/header";
import Leftsidebarnav from "../common/leftSidebarnav";
import { model_routes } from '../../../routes';
import cookie from "react-cookies";

function Dashboard(props)  {
      if(cookie.load("user")){
        return (
          <div className="sb-nav-fixed">
            <Header />
            <div id="layoutSidenav">
              <Leftsidebarnav/>
              <div id="layoutSidenav_content">
              <Switch>
                {model_routes(props).map((prop, key) => (
                  <Route
                    exact
                    path={prop.path}
                    key={key}
                    component={prop.component}
                  />
                ))}
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
      }else{
        return(<Redirect to="/login"/>)
      }
     


    }

export default Dashboard;
