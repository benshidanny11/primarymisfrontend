import React, { useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { loginAction, decodeToken } from "../../redux/action";
import { $ } from "react-jquery-plugin";
import Copyright from "./common/copyligt";
import LinearProgress from "@material-ui/core/LinearProgress";
import { ToastContainer, toast } from "react-toastify";
import cookie from "react-cookies";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgb(188, 209, 229)",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.info.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#1168ca",
  },
  card: {},
  iconcontainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
}));

function Login(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

 

  useEffect(() => {
    const loginResponse = state.loginReducer;
      if (loginResponse.type === "loading") {
        $("#progress").removeClass("progress");
      } else if (loginResponse.type === "error") {
        $("#progress").addClass("progress");
        handleLoginToastError(loginResponse.data.message);
      }
       if (loginResponse.type === "success") {
        cookie.save("primary-mis-token", loginResponse.token);
        dispatch(decodeToken(loginResponse.token))
        $("#progress").addClass("progress");
        window.location.href="/"
      }
    
  }, [state.loginReducer.type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    if(!cookie.load("user")){
    dispatch(loginAction(loginData));
    }
  };

  const handleLoginToastError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  };
 if(!cookie.load("user")){
  
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Card className={classes.card}>
            <div id="progress" className="progress">
              <LinearProgress />
            </div>

            <div className={classes.formContainer}>
              <div className={classes.iconcontainer}>
                <Avatar className={classes.avatar} />
                {/* <LockOutlinedIcon /> */}

                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
              </div>
              <form
                className={classes.form}
                noValidate
                onSubmit={handleSubmit}
                method="post"
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Login
                </Button>
              </form>
            </div>
          </Card>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      <ToastContainer />
    </div>
  );}else{
    return(<Redirect to="/"/>)
    }

}
export default Login;
