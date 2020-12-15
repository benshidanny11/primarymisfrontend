import React,{useState,useEffect} from "react";
import cookie from "react-cookies";
import { Redirect} from "react-router";
import { Link} from "react-router-dom";



function redirect_to_login() {
  return <Redirect to={`/login`} />;
}

function Header(props) {
const [logout,setLogout]=useState(false);

  const handleLogout=()=>{

   setLogout(!logout);
    cookie.remove("user");

  cookie.remove("primary-mis-token");
  window.location.href="/login"
  }

 
    return (
      <div>
        <nav className="sb-topnav navbar navbar-expand navbar-light ">
          <Link className="navbar-brand" to="#">
            Primary MIS logo
          </Link>
          <button
            className="btn btn-link btn-sm order-1 order-lg-0"
            id="sidebarToggle"
            href="#"
          >
            <i className="fas fa-bars"></i>
          </button>
  
          <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
          
            <div className="input-group">{cookie.load("user").names}</div>
          </form>
  
          <ul className="navbar-nav ml-auto ml-md-0">
            <li className="nav-item dropdown">
              <div
                className="nav-link dropdown-toggle"
                id="userDropdown"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-user fa-fw"></i>
              </div>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="userDropdown"
              >
                <span className="dropdown-item" href="#">
                  Settings
                </span>
                <span className="dropdown-item" href="#">
                  Activity Log
                </span>
                <div className="dropdown-divider"></div>
                <span className="dropdown-item" onClick={handleLogout}>
                   Logout
                </span>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    );
  
 
}
export default Header;
