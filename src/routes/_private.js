/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Redirect } from 'react-router-dom'
import { CreactUSer,Home,AllUSers ,Students,Subjects,Points} from '../components/pages/mainusers'
import { useSelector } from "react-redux";
import _ from 'lodash'
import cookie from "react-cookies";

function redirect_to_login() {
  return <Redirect to={`/login`} />;
}

class Routes {
  constructor(props) {
    this.routes = [
      {
        path: "/",
        name: "Dashboard",
        icon: "ti-loop",
        component: Home,
        type: "application",
      },
      {
        path: "/createuser",
        name: "Create User",
        icon: "icon-user",
        component: CreactUSer,
        type: "navigation",
      },
      {
        path: "/allusers",
        name: "All users",
        icon: "icon-user",
        component: AllUSers,
        type: "navigation",
      },
      {
        path: "/students",
        name: "All Students",
        icon: "icon-user",
        component: Students,
        type: "navigation",
      },
      {
        path: "/subjects",
        name: "All subjects",
        icon: "icon-user",
        component: Subjects,
        type: "navigation",
      },
      {
        path: "/points",
        name: "All points",
        icon: "icon-user",
        component: Points,
        type: "navigation",
      },
      
      
      
    ];
  }
}

export const model_routes = (props) => {
  const routes = new Routes(props).routes;
  
  return routes
}

export const navigation_routes = (props) => {
  const { user } = props
  if(!user) {
    return []
  }
  const routes = new Routes(props).routes;
  
  return routes;
}
