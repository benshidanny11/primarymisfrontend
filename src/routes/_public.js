/* eslint-disable import/no-anonymous-default-export */
import { home, login } from '../components/pages'

export default [
  {
    path: "/",
    name: "home",
    icon: null,
    component: home,
  },
  {
    path: "/login",
    name: "Login",
    icon: null,
    component: login,
  },
];
