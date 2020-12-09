/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Redirect } from 'react-router-dom'
import { dashboard,CreateUser } from '../components/pages'
import _ from 'lodash'

function redirect_to_login(props) {
  return <Redirect to={`/login?redirect=${props.location.pathname}`} />;
}

function redirect_to_dashboard() {
  return <Redirect to="dashboard" />;
}

const Component = (props, component) => {
  if(props.user){
    return component;
  } else {
    return redirect_to_login;
  }
};

class Routes {
  constructor(props) {
    this.routes = [
      {
        path: "/",
        name: "Dashboard",
        icon: "ti-loop",
        component: redirect_to_dashboard,
        type: "application",
        access: ["admin", "moderator", "user"],
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: "ti-loop",
        component: Component(props, dashboard),
        type: "navigation",
        access: ["admin", "moderator", "user"],
      },
      {
        path: "/new-user",
        name: "Create New User",
        icon: "icon-user",
        component: Component(props, CreateUser),
        type: "navigation",
        access: ["admin"],
      },
      {
        path: "/setting",
        name: "Setting",
        icon: "icon-settings",
        component: Component(props, dashboard),
        type: "navigation",
        access: ["admin", "moderator", "user"],
      },
      {
        path: "/agancy",
        name: "Manage Agancy",
        icon: "icon-settings",
        component: Component(props, dashboard),
        type: "navigation",
        access: ["admin", "moderator", "user"],
      },
      
    ];
  }
  
  filter(key, value, isArray) {    
    if(isArray){
      this.routes = this.routes.filter((object) => object[key].includes(value));
    } else {
      const object = {};
      object[key] = `${value}`;
      this.routes = _.filter(this.routes, object);
    }
    return this;
  }

  get(args) {
    const currentList = this.routes;
    if (currentList.length === 0) {
      return -1;
    }
    if (args) {
      return currentList.map((item) => _.pick(item, ...args));
    }
    return currentList;
  }
}

export const model_routes = (props) => {
  const routes = new Routes(props).filter('access', 'admin', true).get()
  return routes
}

export const navigation_routes = (props) => {
  const { user } = props
  if(!user) {
    return []
  }
  const routes = new Routes(props)
    .filter('type', 'navigation')
    .filter('access', user.role, true)
    .get()
  return routes
}
