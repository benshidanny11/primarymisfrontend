/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Redirect } from 'react-router-dom'
import { CreactUSer,Home,AllUSers } from '../components/pages/mainusers'
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
      
      
    ];
  }
  
  // filter(key, value, isArray) {    
  //   if(isArray){
  //     this.routes = this.routes.filter((object) => object[key].includes(value));
  //   } else {
  //     const object = {};
  //     object[key] = `${value}`;
  //     this.routes = _.filter(this.routes, object);
  //   }
  //   return this;
  // }

  // get(args) {
  //   const currentList = this.routes;
  //   if (currentList.length === 0) {
  //     return -1;
  //   }
  //   if (args) {
  //     return currentList.map((item) => _.pick(item, ...args));
  //   }
  //   return currentList;
  // }
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
