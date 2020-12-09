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

// Import components
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Dashboard from "./pages/mainusers/dashboard";
import Adduser from "./pages/mainusers/adduser";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
         <Route exact path="/adduser"  component={Dashboard}/>
      </Switch>

     
    </BrowserRouter>
  );
}

export default App;
