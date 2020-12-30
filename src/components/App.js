// Import icons
import "../assets/styles/icons/font-awesome/css/fontawesome-all.css";
import "../assets/styles/icons/simple-line-icons/css/simple-line-icons.css";
import "../assets/styles/icons/weather-icons/css/weather-icons.min.css";
import "../assets/styles/icons/themify-icons/themify-icons.css";
import "../assets/styles/icons/material-design-iconic-font/css/materialdesignicons.min.css";
import "../assets/styles/flaticon/flaticon.css";

//Imort styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./../assets/styles/css/style.css";
import "./../assets/styles/css/mainstyle.css";
import "react-toastify/dist/ReactToastify.css";

// Import components
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Dashboard from "./pages/mainusers/_dashboard";

import cookie from "react-cookies";
import { connect } from 'react-redux'
import jwt from "jsonwebtoken";

import { publicRoutes, model_routes } from "../routes";
function App(props) {

  return (
    <BrowserRouter>
      <Switch>
        {publicRoutes.map((prop, key) => (
          <Route exact path={prop.path} key={key} component={prop.component} />
        ))}
        {model_routes(props).map((prop, key) => (
          <Route exact path={prop.path} key={key} component={Dashboard} />
        ))}
      </Switch>
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => {
  const token = cookie.load("primary-mis-token");
  try {
   const user = jwt.verify(token, "primaryMIS@gmail.com130852");
   return { ...state, user };
 } catch (error) {
   return { ...state, error};
 }
} 

export default connect(mapStateToProps, {  })(App);
